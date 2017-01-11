# Remedy Autofill

This is a Chrome extension to autofill common fields in Remedy helpdesk tickets for Pitt Student Technical Consultants.

### Table of Contents
- [Installation Instructions](#installation-instructions)
- [Configure Settings](#configure-settings)
- [Using the Extension](#using-the-extension)
	- [Fill Template](#fill-template)
	- [Fill Category, Sub-Category, and Assigned To Individual, Device Type](#fill-category-sub-category-and-assigned-to-individual-device-type)
	- [Customer Information](#customer-information)
	- [Close Ticket](#close-ticket)
- [Notes](#notes)
- [Anatomy of this Project](#anatomy-of-this-project)

### Installation Instructions
- On the GitHub page for this extension, click on [releases](https://github.com/njscholfield/remedy-autofill/releases). (It is in the middle above the colored bar)
- Find the newest version and click *Source code (zip)* to download it.
  - Unzip the download if it is not done automatically.
  - You can save this folder anywhere, but you will have to find it later.
- In Google Chrome, click the *menu* button, go to *More Tools*, then *Extensions*.
- Check the box in the top right to enable *Developer Mode*
- Click the *Load unpacked extension...* button
- Find the unzipped folder and select the `app` folder inside of it.

**Important:** You must configure the extension settings for it to work properly. See below:

### Configure Settings
- Go to the extensions page in Chrome.
  - (Chrome Menu > More Tools > Extensions)
- Click 'options' for this extension.
- Enter your Pitt username, and select where you are working.
- Click save.
- If you had Remedy open, you will have to refresh the page for the settings to take effect.

### Using the Extension

###### Make sure you have installed and configured the extension first.

##### Fill Template
- Double click on the *Ticket Template Title* box
- Then hit enter like normal to apply the template

##### Fill Category, Sub-Category, and Assigned To Individual, Device Type
- Double click on the *Category* box

> ###### Exactly what this does:
>  - Sets *Category* to `Client - Hardware / Software`.
>  - Sets *Sub-Category* to `Software Application - Supported`.
>  - Sets *Assigned to Individual* to the `username` entered in options.
>  - Changes the *Device Type* in the *Long Description* to just `Laptop`.

##### Customer Information
- When you hit enter to populate the user info, the *Phone Number* box will automatically be selected.
- Hit enter after entering to phone number to go the *Appointment Type* box
- After changing the *Appointment Type*, the *OS Type* box will automatically be selected.

##### Close Ticket
- Double click on the *Solution Type* box

> ###### Exactly what this does:
> - Sets *Status* to `Closed`
> - Sets *Closed* to `Resolved`

- After you set the *Solution Type* from the menu, the *Hours Worked* box will automatically be selected.

### Notes
- Google Chrome may periodically ask you to disable *Developer Mode* for applications. If you do that, it will disable this extension.

- You can change anything this extension has autofilled like you normally would.

- If you run into any problems or have any feature request, submit an [issue](https://github.com/njscholfield/remedy-autofill/issues) on GitHub. I make no guarantees I will fix issues or add requested features.

- If you know what you are doing and want to make changes, fix something, or add a feature, feel free to submit a pull request.

### Anatomy of this Project
Information about the files that make up this extension.

#### File Tree
```
remedy-autofill-x.x.x/
├── app/
|   ├── icons/
|   |   └── icon_files...
|   ├── src/
|   |   ├── inject/
|   |   |   └── autofill.js
|   |   └── options/
|   |       ├── index.html
|   |       └── options.js
|   └── manifest.json
├── LICENSE.md
└── README.md
```

#### File/Folder Descriptions
- `app` folder
  - this contains the actual extension
- `app/icons` folder
  - generic extension icons
- `app/src` folder
  - this is where the actual code is
- `app/src/inject` folder
  - contains `autofill.js`
    - this is the file that does the actual work on the page
    - it is 'injected' (added) into the Remedy page to add the autofill features
- `app/src/options` folder
  - these files control the extension settings page
- `app/manifest.json`
  - a file that tells Chrome about the extension
- `LICENSE.md`
  - open source software license information
- `README.md`
  - what you are reading right now
