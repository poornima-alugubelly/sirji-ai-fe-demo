import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from '../workspace/Workspace';
import { Avatar } from '@/components/Avatar';
import Image from 'next/image';

type messagesType = {
  id: string;
  query: string;
  response: string;
};

type ApiState = 'success' | 'error';

interface ApiResponse<T> {
  state: ApiState;
  data?: T;
  error?: string;
}

type fetchResponseType = {
  response: string;
};

async function fetchResponse(
  query: messagesType,
  shouldFail: boolean
): Promise<ApiResponse<messagesType>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          state: 'error',
          error: 'Failed to fetch user data',
        });
      } else {
        const resData = {
          ...query,
          response: 'Sirji has answered',
        };
        resolve({ state: 'success', data: resData });
      }
    }, 1000);
  });
}

export const Chat = () => {
  const mockMessage = {
    id: uuidv4(),
    query: 'Please debug this code',
    response: 'Sirji has answered',
  };

  const [messages, setMessages] = useState<messagesType[]>([
    mockMessage,
  ]);
  const [latestQuery, setLatestQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const getResponse = async (message: messagesType) => {
    const res = await fetchResponse(message, false);
    return res;
  };

  const onSubmit = async () => {
    setLoading(true);
    const newMsg = {
      id: uuidv4(),
      query: input,
      response: '',
    };
    setLatestQuery(input);
    setInput('');

    try {
      const res = await getResponse(newMsg);
      if (res.state === 'success' && res.data) {
        setMessages((prev) => {
          return [...prev, res.data!];
        });
        setLatestQuery('');
      } else {
        setMessages((prev) => {
          return [
            ...prev,
            {
              ...newMsg,
              response: 'could not generate response',
            },
          ];
        });
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-grayBgDark border border-grayBgLight w-1/2 rounded-md py-4 px-6">
      <h1 className="text-2xl font-bold">Solving issue</h1>

      <main className="flex-grow overflow-y-auto mt-8">
        {messages.map((message, index) => (
          <div key={index} className=" mb-4">
            <div className="flex">
              <Avatar text="Y" classNames="bg-orange-500 mr-4" />
              <div>
                <p className="font-semibold">You</p>
                <p className="mt-2">{message.query}</p>
              </div>
            </div>

            <br />

            <div className="flex">
              <Avatar
                text="S"
                classNames="bg-gradient-to-r from-primary to-green-600 mr-4 text-grayBgLight"
              />
              <div>
                <p className="font-semibold">Sirji</p>
                <p className="mt-2">{message.response}</p>
              </div>
            </div>
          </div>
        ))}
        {latestQuery && (
          <div className="flex">
            <Avatar text="Y" classNames="bg-orange-500 mr-4" />
            <div>
              <p className="text-semibold">You</p>
              <p className="mt-2">{latestQuery}</p>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex flex-col gap-1">
            <div className="animate-pulse bg-gradient-to-r from-green-200 to-green-600 opacity-30 h-4 mt-4 rounded-md"></div>
            <div className="animate-pulse bg-gradient-to-r from-green-200 to-green-600 opacity-30 h-4 mt-4 rounded-md w-[80%]"></div>
            <div className="animate-pulse bg-gradient-to-r from-green-200 to-green-600 opacity-30 h-4 mt-4 rounded-md w-[60%]"></div>
          </div>
        )}
      </main>

      <div className="flex items-center ">
        <input
          className="text-gray-700 flex-grow px-4 py-2 rounded-lg grayBgLight focus:outline-none focus:ring-2 focus:ring-grayBgLight"
          placeholder="Type your query..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
        />
        <button className="ml-4 px-4 py-2 rounded-lg bg-primary text-grayBgLight font-semibold">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
