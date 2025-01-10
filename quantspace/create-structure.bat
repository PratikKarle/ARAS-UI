@echo off
:: Root folder
set "root=src"

:: Create folders
mkdir "%root%\components\Navbar"
mkdir "%root%\components\Sidebar"
mkdir "%root%\components\GridView"
mkdir "%root%\components\Form"
mkdir "%root%\components\Modal"
mkdir "%root%\pages"
mkdir "%root%\layouts"
mkdir "%root%\services"
mkdir "%root%\store"

:: Create files
echo // Placeholder for Navbar component > "%root%\components\Navbar\Navbar.js"
echo // Placeholder for Sidebar component > "%root%\components\Sidebar\Sidebar.js"
echo // Placeholder for GridView component > "%root%\components\GridView\GridView.js"
echo // Placeholder for Form component > "%root%\components\Form\Form.js"
echo // Placeholder for Modal component > "%root%\components\Modal\Modal.js"
echo // Placeholder for Dashboard page > "%root%\pages\Dashboard.js"
echo // Placeholder for Settings page > "%root%\pages\Settings.js"
echo // Placeholder for MainLayout > "%root%\layouts\MainLayout.js"
echo // Placeholder for API calls > "%root%\services\api.js"
echo // Placeholder for Redux store > "%root%\store\index.js"
echo // Placeholder for main app component > "%root%\App.js"
echo // Placeholder for entry point > "%root%\index.js"

:: Success message
echo Folder structure created successfully!
pause