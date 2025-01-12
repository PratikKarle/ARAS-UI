QuantSpace – Custom Aras UI

Overview
The ARAS-UI project is a modern and efficient user interface for interacting with ARAS Innovator. It integrates advanced features, custom Web APIs, and a streamlined front-end experience to enhance the functionality and usability of ARAS Innovator.

Installation

Prerequisites:
1.	ARAS Innovator installed and configured.
2.	Node.js and npm installed for front-end development.
3.	.NET 6.0 SDK installed for the WebAPI back-end.

Steps:
1.	Clone the repository:
git clone https://github.com/PratikKarle/ARAS-UI.git
2.	Navigate to the project directory:
cd ARAS-UI
3.	Install dependencies:
npm install
4.	Set up the back-end:
o	Open the WebAPI project in Visual Studio.
o	Update ARAS Innovator server credentials in the LoginController.cs file.
o	Run the WebAPI project.
5.	Start the front-end:
npm start
6.	Open the application in your browser at http://localhost:3000.

Usage:
•	Logging In: Enter your ARAS credentials to log in and access your tasks and items.
•	Navigation: Use the sidebar to navigate between various sections such as BOM, tasks, and forms.
•	Task Management: View and interact with your InBasket tasks fetched using custom WebAPI.
•	BOM Management: Utilize the Ant Design-based UI for an intuitive experience.

Technical Stack:
•	Front-End: React, Ant Design, React Flow
•	Back-End: ASP.NET Core WebAPI, ARAS Innovator APIs
•	Languages: JavaScript, C#