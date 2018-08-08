# TSD Autofill

This is a Chrome extension to autofill common fields in support tickets and improve customer search for Pitt Student Technical and Help Desk Consultants.

### Table of Contents
- [Installation Instructions](#installation-instructions)
- [Configure Settings](#configure-settings)
- [Using the Extension](#using-the-extension)
	- [Improved Customer Search](#improved-customer-search)
	- [Generic Ticket Autofill](#generic-ticket-autofill)
	- [New Computer Setup](#new-computer-setup)
- [Notes](#notes)
- [Anatomy of this Project](#anatomy-of-this-project)

### Installation Instructions

#### Chrome Web Store Installation
- After paying Google $5, this extension is now on the Chrome Web Store. The manual installation instructions below will still work but it's much easier to just install it through the store.
- Here is the download link:
	- https://bit.ly/tsdauto
- **One thing to note:**
	- If you are signed into Chrome, the extension will install on any browser you are signed into and sync you settings. 
		- *This means that it will sync whether you are working at the University Store or Towers, so keep that in mind when working at either location.*

**Important:** After installing, you must configure the extension settings for it to work properly. See below:

---
### Configure Settings
- Right click on the extension icon.
- Click 'Options'.
- Select where you are working.
- Click save.
- If you had Salesforce open, you will have to refresh the page for the settings to take effect.

### Using the Extension

###### Make sure you have installed and configured the extension first.

##### Improved Customer Search
- **Just click on the search button like usual to trigger it**
- Makes it easier to search by username instead of by full name
- Automatically searches using *All Fields*
- If only 1 result is found for the entered username, it is automatically selected and the search tab is closed
	- (search tab will open and then quickly close itself)
- If there is more than 1 result, the tab will say open to allow you to select the correct one
	- *once you select one, the tab will stay open but it will be filled in the ticket so just manually close the search tab*
> After you click the search button once, the button will revert to the default functionality. This allows you to get more info about the customer after their name is filled if you need to.

##### Generic Ticket Autofill
- Double click on the *Contact Name* box to trigger the autofill
	- You can also select the *Other* button from the extension popup by clicking on the extension icon
- Depending which location you set the extension to, the fields will fill differently.
> ###### Location: University Store or Towers:
>	- Sets *Case Origin* to `Walk-In`
> - Sets *Technical Support Desk* to the `location`
 selected in the extension settings
> - Sets *Type* to `Problem`
> - Sets *Service Area* to `End-Point Computing`

> ###### Location: Help Desk:
> - Sets Case Origin to `Phone`

##### New Computer Setup
- Click the extension icon in the corner of the browser window
- Select the *New Computer Setup* button
> - Fills everything from *Generic Ticket Autofill* (see above)
> - Changes *Type* to `Request`
> - Sets *Subject* and *Description* to `New Computer Setup`
> - Sets *Supported App* to `Microsoft Office 365 Suite`
> - Sets *Service* to `End-Point Support (Desktops, Mobile Devices, etc.)`
> - Sets *Device Type* to `Laptop`

### Notes
- You can change anything this extension has autofilled like you normally would.

- If you run into any problems or have any feature request, submit an [issue](https://github.com/njscholfield/tsd-autofill/issues) on GitHub. I make no guarantees I will fix issues or add requested features.

- If you know what you are doing and want to make changes, fix something, or add a feature, feel free to submit a pull request.

### Anatomy of this Project
Information about the files that make up this extension.

#### File Tree
```
tsd-autofill-x.x.x/
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
    - it is 'injected' (added) into the page to add the autofill features
- `app/src/options` folder
  - these files control the extension settings page
- `app/manifest.json`
  - a file that tells Chrome about the extension
- `LICENSE.md`
  - open source software license information
- `README.md`
  - what you are reading right now
