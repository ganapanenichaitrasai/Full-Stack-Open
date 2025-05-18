``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write a note and click "Save"
    Browser->>Server: POST /new_note (note content)
    activate Server
    Server-->>Browser: 200 OK (JSON response)
    deactivate Server
    Browser-->>Browser: Update UI with new note (DOM update)
```