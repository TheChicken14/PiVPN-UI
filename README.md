# PiVPN UI

## Web interface for managing and downloading PiVPN clients

PiVPN UI is an easy to use web interface for managing PiVPN client files.

## Warning: This is only tested with OpenVPN

## Installation

### Prerequisites

- NodeJS v12+
  - Install with [NVM](https://github.com/nvm-sh/nvm) or from [Nodejs.org](https://nodejs.org)
- [PiVPN](https://pivpn.io) is installed
- Apache, nginx or any reverse proxy (optional)

### Cloning project

To clone PiVPN-UI run the following command:

```bash
git clone https://github.com/TheChicken14/PiVPN-UI.git
cd PiVPN-UI
```

### Setting up

To set up the project simply run the following command, this will install the dependencies and set up the configuration file.

```bash
npm install
```

## Usage

To start PiVPN-UI, simply run `npm start`. Then visit `http://<raspberry pi's ip>:<your port>` in your browser.
