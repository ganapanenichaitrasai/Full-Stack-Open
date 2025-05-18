``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write a note and click "Save"
    Browser->>Server: POST /new_note (note content)
    activate Server
    Server--xBrowser: (No response / Error)
    deactivate Server
    Browser-->>Browser: Show error message to user
```