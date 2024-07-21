import {asyncHandler} from '../utils/AsyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from '../models/message.model.js';

const sendMessage = asyncHandler( async(req, res) => {
     try {
        const { senderId, content} = req.body;
        const { chatId } = req.params;
        if(!chatId){
            throw new ApiError(401, "Chat Id wrong")
        }

        const message = await Message.create({
           chat: chatId,
           sender: senderId,
           content,
           messageType: 'text',
        });

        // Emit the message to all connected clients
        const io = req.app.get('socketio');
        if (io) {
            io.emit('receiveMessage', message);
        } else {
            throw new ApiError(500, "Socket.io not initialized");
        }

         return res.status(200)
         .json(
           new ApiResponse(200, message, "Message Sent")
         )
     } catch (error) {
        throw new ApiError(500, error?.message, "Something went wrong")
     }
});

// const receiveMessage = asyncHandler( async(req, res) => {
//     const {} = 
// })

export {
    sendMessage
}
