import { useState } from 'react';
import { Shell } from './Shell';
import { Browser } from './Browser';
import { Editor } from './Editor';
import { Planner } from './Planner';
import classNames from 'classnames';

export const Workspace = () => {
  const tabs = ['Shell', 'Browser', 'Editor', 'Planner'] as const;
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]>('Shell');

  const renderTab = () => {
    switch (selectedTab) {
      case 'Shell':
        return <Shell />;

      case 'Browser':
        return <Browser />;

      case 'Editor':
        return <Editor />;

      case 'Planner':
        return <Planner />;
    }
  };
  return (
    <div className="bg-grayBgDark border border-grayBgLight   w-1/2 rounded-md py-4 px-6">
      <h3 className="text-2xl font-bold">{`Sirji's Workspace`}</h3>
      <div className="flex mt-4">
        {tabs.map((tab) => {
          return (
            <div
              key={tab}
              className={classNames('p-2.5', {
                'font-bold': selectedTab === tab,
              })}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {selectedTab === tab && (
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              )}
              {tab}
            </div>
          );
        })}
      </div>
      <div className="w-[40vw] height-[80vh] border border-zinc-500 bg-grayBgBlack rounded-md">
        <div className="flex">
          <div className="border border-l-0 border-b-0 border-t-8 border-r-1 border-r-zinc-400 border-t-primary rounded-t-md   px-8 py-2">
            {selectedTab}
          </div>
          <div className="bg-zinc-800 py-2"></div>
        </div>
        {renderTab()}
      </div>
    </div>
  );
};
