const { success_function, error_function } = require('../utils/responsehandler');
const readData = require('../utils/file-upload').readData;
const writeData = require('../utils/file-upload').writeData;
const path = require('path');

exports.addUser = (req, res) => {
    try {
        const users = readData();
        const newUser = { ...req.body, id: (users.length ? Math.max(...users.map(user => user.id)) + 1 : 1) };
        users.push(newUser);
        writeData(users);

        res.status(200).json({
            success: true,
            message: "User added successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add user",
        });
    }
};

exports.getAllUsers = (req, res) => {
    try {
        const users = readData();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
        });
    }
};

exports.getSingleUsers = (req, res) => {
    try {
        let ID = parseInt(req.params.id, 10);
        console.log("ID: ", ID);

        const users = readData();
        const singleUser = users.find(user => user.id === ID);

        if (!singleUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            singleUser,
        });

    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
        });
    }
};

exports.editUser = (req, res) => {
    try {
        let ID = parseInt(req.params.id, 10)
        console.log("ID: ", ID);

        let body = req.body;
        console.log("body: ", body);

        const users = readData();
        let userIndex = users.findIndex(user => user.id === ID)

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update the user
        users[userIndex] = { ...users[userIndex], ...body }
        writeData(users);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: users[userIndex],
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
};

exports.deleteUser = (req, res) => {
    try {
        let ID = parseInt(req.params.id, 10);
        console.log("ID: ", ID);

        const users = readData();
        let userIndex = -1;

        // Find the user index
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === ID) {
                userIndex = i;
                break;
            }
        }

        // Check if the user was found
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Store the user to be deleted
        const deletedUser = users[userIndex];

        // Remove the user from the array
        users.splice(userIndex, 1);
        writeData(users);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser,
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};











