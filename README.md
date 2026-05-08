# Bara-bara-watch

Bara-bara-watch is a multi-watch web app where you can watch multiple YouTube videos at once.

## Demo

https://github.com/user-attachments/assets/51b7579d-6e93-4f21-aeeb-bc5b3a521a48

## Features

- Search for different videos from YouTube and add them to one of the available watchroom slots to watch.

- Add up to four videos, with the top navigation showing the current stream count.

- Search results include video title, channel name, views/current viewers, description, and an add button when room is available.

- Added streams appear inside the watchroom immediately.

### Layouts

#### 2-Stream cases:

Streams can be shown side-by-side or stacked vertically.

#### 3-Stream cases:

One stream can be shown as the main stream, either on the left or on top, with the remaining two streams arranged beside or below it.

### Stream settings

A user can also change position of the streams in the stream setting where each stream is represented as a window with arrows showing where they can be moved. They also have a x button where you can remove the stream if wanted.
Depending on the selected layout and amount of streams the layout inside this also changes to correctly display how to watchroom is looking as to not be confusing and easy to understand.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: .NET 8
- **External API**: YouTube API v3

## Getting Started

### Frontend

To run the front end you should from the root dev do the following commands:

```bash
cd frontend
npm install
npm run dev
```

To format and validate the frontend:

```bash
npm run format
npm run format:check # this is to just check it without doing any changes to the files
```

### Backend

To get the backend running, you must first get a user-secrets setup with the YouTube Data API v3 going. On the Google cloud console and use that key credential as your secret.

```bash
cd backend/src/Barabara.Api
dotnet user-secrets init
dotnet user-secrets set "YouTube:ApiKey" "YOUR_YOUTUBE_V3_API_KEY"
```

Then to run the project from the backend/src/Barabara.Api folder:

```bash
dotnet run
```

Or from backend folder:

```bash
dotnet run --project src/Barabara.Api
```

### Validation

Frontend checks:

```bash

cd frontend
npm run format:check
npm run lint
npm run build
npm run test:run
```

Backend checks:

```bash
cd backend
dotnet restore
dotnet build --no-restore
```

## Current Limitations

- YouTube iframe playback controls are limited and interfere with some wanted features.
- Search is currently limited to up to 10 results.
- No auth yet and not possible with shared rooms.
- Not deployed yet.

## Planned Features

- Being able to add a YouTube video by a direct url as well instead of searching.
- Having a group of YouTube channel names to search for just their videos or if they are live streaming.
- Play all videos at once with a button.
- Mute/unmute videos by 1,2,3,4 buttons or something similar.
