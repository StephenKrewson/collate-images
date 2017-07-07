### Overview
The Illustration Collation project aims to make it easier for scholars to find variations and commonalities between different editions of the same work, by making sequences of images of the pages of the work available as rows in a tabular interface.

By presenting all pages in the work in a horizontal sequence, the interface makes it easy visually to scan small versions of the page images rapidly, and to identify major or minor variations.

By aligning page facsimiles horizontally within a row, visible commonalities and variations across rows (editions) will readily emerge.

### The purpose of this prototype
This prototype is narrowly focused on a single aspect of the envisioned application, the main editorial interface of the application, which will include:

- An “edition grid”, a tabular interface with each row containing a sequence of thumbnail images of facsimiles of the pages of an edition of a work.
- A number of editions of a single work, with corresponding page images (to be provided by the client)
- Drag and drop functionality to allow movement of page images.

### Possible future features to be implemented
This work done so far aims to prove out the project’s main interface component, and facilitate development of further features. Some ideas that have been discussed fall into the following categories.

#### Content management
These features are for site administrators to add and manage content, including images and organizational and contextualizing description including editions, sets of editions, and per-user collations.

#### Image import and processing
The import feature will support import of bitmapped digital images by admin users via a web browser, from a variety of sources.

#### Image delivery
Relevant advancements in web-based image delivery technologies include responsive images, content delivery networks, maintenance of canonical URIs for embedding images in other web-based documents, and deep zoom.

### How to run and deploy

#### Run locally
_(Assuming you've got Node version 6.0 or greater installed)_

- `npm install`
- `npm start`

#### Deploying to Heroku

- `heroku create -b https://github.com/mars/create-react-app-buildpack.git`

#### Deploying Manually

- `npm run build`

