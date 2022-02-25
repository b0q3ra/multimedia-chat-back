const Chat = require('../../models/chat')
const Message = require('../../models/message')

exports.getAllChats = async (req, res) => {
    try {

        let chats = await Chat.find()//return all users
        chats = await Chat.populate(chats, ['firstUser', 'secondUser', 'messages'])//populate users


        if(!chats || chats==={}) throw 'Error, no users finded'


        res.json({//return response
            status: 'success',
            data: chats
        })

    } catch (error) {//Error
        res.json({
            status: 'failed',
            data: error
        })
    }


}

exports.getMyChats = async (req, res) => {
    try {

        if(!req.body.senderID) throw 'ID is mandatory'

        let chats = await Chat.find({//find all my chats
            $or: [
                {
                    firstUser: req.body.senderID
                },
                {
                    secondUser: req.body.senderID
                }
            ]
        })
        
        chats = await Chat.populate(chats, ['firstUser', 'secondUser', 'messages'])//populate users


        if(!chats || chats==={}) throw 'Error, no users finded'

        res.json({//return response
            status: 'success',
            data: chats
        })

    } catch (error) {
        res.json({
            status: 'failed',
            data: error
        })
    }
}

exports.postNewChat = async (req, res) => {
    try {
        if(!req.body.senderID || !req.body.reciverID) throw "Error, id is required"

        if(req.body.senderID != req.user._id) throw "Error, user id is not valid"
        
        const existsChat = await Chat.find({
            $or: [
                {
                    firstUser: req.body.senderID, 
                    secondUser: req.body.reciverID
                },
                {
                    firstUser: req.body.reciverID,
                    secondUser: req.body.senderID
                }
            ]
        })

        if(!existsChat || existsChat.length > 0) throw 'Error, chat was already created'
        
        const newChat = new Chat({//we create new chat 
            firstUser: req.body.senderID,
            secondUser: req.body.reciverID,
            messages: [],
        })

        const newMessage = new Message({//we create new message
            chat: newChat._id,
            sender: req.body.senderID,
            reciver: req.body.reciverID,
            body: 'I want to talk with you',
        })

        newChat.messages = [newMessage._id]//we add our new message's id to our new chat
        
        await newChat.save()//save
        await newMessage.save()

        await newChat.populate(['firstUser', 'secondUser', 'messages'])//we populate our new chat
        

        res.json({
            status: 'success',
            data: newChat
        })

    } catch (error) {
        res.json({//return response with failed status
            status: 'failed',
            data: error
        })
    }
}

