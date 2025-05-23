```typescript
import mongoose, { Schema, Types } from 'mongoose';

// Define the CodeSnippet interface for TypeScript
interface ICodeSnippet {
    name: string;
    codeId: string;
    language: string;
    version: string;
    sourceCode: string;
    userId: Types.ObjectId; // Use Types.ObjectId for clarity
    input?: string; // Optional input
    output?: string; // Optional output
    createdAt: Date;
}


const codeSchema = new Schema<ICodeSnippet>({
    name: {
        type: String,
        required: true,
    },
    codeId: {
        type: String,
        required: true,
        unique: true,
    },
    language: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    sourceCode: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the users model
        required: true,
    },
    input: {
        type: String,
        default: null // Make it explicitly nullable
    },
    output: {
        type: String,
        default: null // Make it explicitly nullable
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create and export the CodeSnippet model
const CodeSnippet = mongoose.model<ICodeSnippet>('CodeSnippets', codeSchema);

export default CodeSnippet;
```