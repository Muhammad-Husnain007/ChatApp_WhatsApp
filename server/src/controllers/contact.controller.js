import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from '../models/contact.model.js';
import { User } from '../models/user.model.js';

const userContact = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const { userId } = req.params;

        // Fetch user and populate contacts
        const user = await User.findById(userId).populate('contacts.contact');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Check if contact already exists
        const contactExists = user.contacts.some(contactObj => contactObj.contact.phoneNumber === phoneNumber);
        if (contactExists) {
            throw new ApiError(400, 'This contact already exists in your contacts list');
        }

        // Check if the phone number is associated with an existing user
        const existingUser = await User.findOne({ phoneNumber });
        let userExist = false;
        let contactUserId = null;

        if (existingUser) {
            userExist = true;
            contactUserId = existingUser._id;
        }
       console.log('User Existance:  ',userExist)
       console.log('User Id:  ',contactUserId)
        // Create new contact
        const newContact = new Contact({
            firstName,
            lastName,
            phoneNumber,
            user: contactUserId
        });

        await newContact.save();

        // Push the new contact to the user's contacts
        user.contacts.push({
            contact: newContact._id,
            exists: userExist
        });

        await user.save();

        // Re-fetch the user to ensure the contact is populated correctly
        const updatedUser = await User.findById(userId).populate('contacts.contact');

        return res.status(200).json(
            new ApiResponse(200, { contact: newContact, updatedContacts: updatedUser.contacts }, "Contact added successfully")
        );
    } catch (error) {
        console.error(error); // Add this line to log the error
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const getAllContacts = asyncHandler(async (req, res) => {
    try {
        let contacts = await Contact.find(req.users);
        for (const contact of contacts) {
            if (!contact.user) {
                const user = await User.findOne({ phoneNumber: contact.phoneNumber });
                
                if (user) {
                    contact.user = user._id;
                    await contact.save(); 
                }
            }
        }
        contacts = await Contact.find(req.users);
        return res.status(200).json(new ApiResponse(
            200,
            contacts,
            "Contacts retrieved and updated successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const getByIdContact = asyncHandler(async (req, res) => {
    try {
        const {contactId} = req.params;
        const contacts = await Contact.findById(contactId);
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
