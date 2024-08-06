import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from '../models/message.model.js';
import { Chat } from '../models/chat.model.js';

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { senderId, content, receiverId } = req.body;
    const { chatId } = req.params;

    if (!chatId) {
      throw new ApiError(401, "Chat Id is missing or incorrect");
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }
    if (!receiverId) {
      return res.status(400).json({ error: "Receiver Id is missing" });
    }
    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      receiver: receiverId,
      content,
      messageType: 'text',
    });

    chat.chats.push(message._id);
    await chat.save();

    return res.status(200).json(
      new ApiResponse(200, message, "Message sent successfully")
    );
  } catch (error) {
    throw new ApiError(500, error?.message, "Something went wrong");
  }
});

const receiveMessage = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      throw new ApiError(404, "Chat Id not Found");
    }
    const chat = await Chat.findById(chatId).populate('chats');
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    const messages = chat.chats;

    return res.status(200).json(
      new ApiResponse(200, { messages }, "Messages received successfully")
    );
  } catch (error) {
    throw new ApiError(500, error?.message, "Something went wrong");
  }
});

const updateMessage = asyncHandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    if (!messageId) {
      throw new ApiError(404, "Message Id not Found");
    }
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $set: { content } },
      { new: true }
    );

    const io = req.app.get('socketio');
    io.emit('messageUpdated', message); // Emit messageUpdated event

    return res.status(200).json(
      new ApiResponse(200, message, "Message updated successfully")
    );
  } catch (error) {
    throw new ApiError(500, error?.message, "Something went wrong");
  }
});

const getByIdMessage = asyncHandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      throw new ApiError(404, "Message Id not Found");
    }
    const message = await Message.findById(messageId);
    return res.status(200).json(
      new ApiResponse(200, message, "Message retrieved by Id successfully")
    );
  } catch (error) {
    throw new ApiError(500, error?.message, "Something went wrong");
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      throw new ApiError(404, "Message Id not Found");
    }
    const message = await Message.findByIdAndDelete(messageId);

    const io = req.app.get('socketio');
    io.emit('messageDeleted', messageId); // Emit messageDeleted event

    return res.status(200).json(
      new ApiResponse(200, message, "Message deleted successfully")
    );
  } catch (error) {
    throw new ApiError(500, error?.message, "Something went wrong");
  }
});

export {
  sendMessage,
  receiveMessage,
  updateMessage,
  deleteMessage,
  getByIdMessage
};
