``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write a note and click "Save"
    Browser->>Server: POST /new_note (note content)
    activate Server
    Server-->>Browser: 302 Redirect to /
    deactivate Server
    Browser->>Server: GET /
    activate Server
    Server-->>Browser: HTML page with new note
    deactivate Server
```