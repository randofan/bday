import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Message {
  message: string;
  timestamp: string;
}

interface MessagesData {
  messages: Message[];
}

interface FilteredMessage {
  message: string | null;
  timestamp: string;
  locked: boolean;
}

export async function GET() {
  try {
    // Read messages.json from the file system
    const filePath = join(process.cwd(), 'messages.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const data: MessagesData = JSON.parse(fileContent);

    // Get current server time
    const now = new Date();

    // Filter messages based on timestamp
    const filteredMessages: FilteredMessage[] = data.messages.map((msg) => {
      const messageDate = new Date(msg.timestamp);
      const isUnlocked = messageDate <= now;

      return {
        message: isUnlocked ? msg.message : null, // Only send message text if unlocked
        timestamp: msg.timestamp,
        locked: !isUnlocked,
      };
    });

    return NextResponse.json({ messages: filteredMessages });
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    );
  }
}
