# Talkrr
The Talkrr project is a real-time chat application designed to run on a local machine, facilitating communication between users on the same network. The application consists of a front-end webpage where users can enter their names to identify themselves in the chat. This webpage can be opened in multiple windows or tabs within the same browser or across different browsers.

Once the user enters their name, they can start sending messages, which are then displayed in real-time across all instances of the webpage open on the network. This means that if a user sends a message from one window, it will instantly appear in every other window that is open, creating a seamless and synchronous chatting experience.

The architecture of Talkrr involves a client-server model where each instance of the webpage acts as a client, and there is a common server running on localhost that manages the communication between clients. When a message is sent from a client, it is transmitted to the server, which then relays it to all connected clients, ensuring that everyone receives the message simultaneously.
Website Link : https://talkrr1.onrender.com

