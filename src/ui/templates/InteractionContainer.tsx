import Chat from '../organisms/chat/Chat';
import { Workspace } from '../organisms/workspace/Workspace';

export const InteractionContainer = () => {
  return (
    <div className="flex gap-3 bg-stone-900 p-6 h-screen w-screen text-white01">
      <Chat />
      <Workspace />
    </div>
  );
};
