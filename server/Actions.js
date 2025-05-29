```javascript
/**
 * @description Defines the actions that can occur within the code collaboration environment.
 */
const ACTIONS: {
    JOIN: string;
    JOINED: string;
    DISCONNECTED: string;
    CODE_CHANGE: string;
    SYNC_CODE: string;
    LEAVE: string;
} = {
    JOIN: 'join', // User joining the room
    JOINED: 'joined', // User successfully joined the room
    DISCONNECTED: 'disconnected', // User disconnected from the room
    CODE_CHANGE: 'code-change', // Code has been changed
    SYNC_CODE: 'sync-code', // Synchronize code with other users
    LEAVE: 'leave', // User leaving the room
};

export default ACTIONS;
```