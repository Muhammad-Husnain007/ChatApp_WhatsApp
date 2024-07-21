import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from '../models/contact.model.js';
import { User } from '../models/user.model.js';

const userContact = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const { userId } = req.params;

        const user = await User.findById(userId).populate('contacts.contact');

        // Check if the contact already exists in the user's contact list
        const contactExists = user.contacts.some(contactObj => contactObj.contact.phoneNumber === phoneNumber);
        if (contactExists) {
            throw new ApiError(400, 'This contact already exists in your contacts list');
        }

        // Check if a user with this phone number exists
        const existingUser = await User.findOne({ phoneNumber });
        let userExist = false;
        let contactUserId = null;

        if (existingUser) {
            userExist = true;
            contactUserId = existingUser._id;
        }

        // Create or update the contact in the Contact collection
        const newContact = new Contact({
            firstName,
            lastName,
            phoneNumber,
            user: contactUserId
        });

        await newContact.save();

        // Add the contact to the user's contact list
        user.contacts.push({
            contact: newContact._id,
            exists: userExist
        });

        await user.save();

        return res.status(200).json(
            new ApiResponse(200, { contact: newContact }, "Contact added successfully")
        );
    } catch (error) {
        throw new ApiError(500, error?.message, "Something went wrong");
    }
});


const getAllContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await Contact.find(req.users);
        return res.status(200)
            .json(new ApiResponse(
                200,
                contacts,
                "Contact retrieved successfully"
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const getByIdContact = asyncHandler(async (req, res) => {
    try {
        const {contactId} = req.params
        const contacts = await Contact.find({contactId});
        return res.status(200)
            .json(new ApiResponse(
                200,
                contacts,
                "Contact retrieved successfully"
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const {contactId} = req.params
        const contacts = await Contact.findByIdAndDelete(contactId);
        return res.status(200)
            .json(new ApiResponse(
                200,
                contacts,
                "Contact deleted successfully"
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const updateContact = asyncHandler(async (req, res) => {
    try {
        const {contactId} = req.params;
        const {firstName, lastName, phoneNumber} = req.body;
        const contacts = await Contact.findByIdAndUpdate(
            contactId,
           { 
            $set: {
                firstName, lastName, phoneNumber
            }
        },
         { new: true }
           
 )
        return res.status(200)
            .json(new ApiResponse(
                200,
                contacts,
                "Contact updated successfully"
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

export {
    userContact,
    getAllContacts,
    getByIdContact,
    deleteContact,
    updateContact,
};
