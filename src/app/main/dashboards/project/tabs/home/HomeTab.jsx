import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import { useRef, useState } from 'react';
import Chat from 'src/app/main/apps/messenger/messengerPanel/Chat';
import { chatMessages } from './chatData';
import ChatComponent from './ChatComponent';
import { Box, Tab, Tabs } from '@mui/material';

/**
 * The HomeTab component.
 */

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function HomeTab() {
  const [activeState, setActiveState] = useState(0);
  const [activeLiveItemState, setActiveLiveItemState] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const chatRef = useRef(null);
  const scrollBottom = () => {
    if (!chatRef.current) {
      return;
    }

    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'instant',
    });
  };
  const states = ['Device', 'Special Functions'];
  const liveItems = ['Live Video', 'Live Text'];
  const controlCommands = [
    'Substitute Ticket',
    'Switch Function On',
    'Switch Function Off',
    'Out of Order',
    'In Order',
    'Initialization',
    'Wake Up',
    'Cash Data',
    'Card Transactions',
    'Payments',
    'Exception Transactions',
    'Save Logs',
  ];
  const container = {
    show: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      //   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 w-full min-w-0 p-24"
      className="flex flex-col gap-[10px] w-full min-w-0 p-24 items-stretch"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="flex gap-24" variants={item}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="flex-1 flex gap-10">
              <div className="flex flex-1 flex-col min-w-[300px]">
                <p className="font-[600] text-[14px]">State</p>
                <div className="flex flex-col mt-5">
                  <div className="flex items-center">
                    {states.map((item, index) => (
                      <p
                        key={index}
                        className={`border-2 border-b-0 mr-2 relative after:absolute after:-bottom-2 after:left-0 after:content-[' '] after:w-full after:h-2 px-8 cursor-pointer ${index === activeState ? 'py-3 after:bg-red-400 bg-red-400 text-white rounded-tl rounded-tr' : 'mt-5 bg-[#eee] text-[#000]'}`}
                        onClick={() => setActiveState(index)}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="p-5 flex flex-col border-2 bg-red-400">
                    <div>
                      <p className="text-white">Normal State</p>
                    </div>
                    <div className="min-h-[240px] border-2 border-black rounded mt-4 bg-white">
                      <div className="flex items-center border-b-2 border-b-black bg-[#888] text-white px-4 py-2">
                        <p className="mr-6">State</p>
                        <p>Message</p>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="flex flex-col h-auto">
                <p className="font-[600] text-[14px]">Device</p>
                <div className="mt-10 w-[150px] h-[300px] flex flex-col border-2 rounded border-black"></div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex-1">
              <div className="flex-1 flex flex-col h-auto">
                <p className="font-[600] text-[14px]">Control commands</p>
                <div className="flex-1 grid grid-cols-4 gap-[10px] border-2 border-black p-5 rounded mt-32">
                  {controlCommands?.map((item, index) => (
                    <p
                      key={index}
                      className="border-2 border-black rounded flex items-center justify-center text-center text-[12px] min-h-[80px] font-[400]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="flex-[2]">
              <p className="font-[600] text-[14px]">Events</p>
              <div className="border-2 rounded border-black mt-5">
                <div className="flex items-center p-5">
                  <select className="border-2 mr-5">
                    <option>Message</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <input className="border-2 border-black" />
                  <button className="border-2 ml-5 px-5 border-black rounded">
                    +
                  </button>
                </div>
                <div className="bg-[#fefefe] max-h-[250px] overflow-y-auto p-5">
                  <div className="flex items-center border-b-1 py-5">
                    <p className="mr-16">State</p>
                    <p className="flex-[2] border-l-1 border-r-1 px-5">
                      Message
                    </p>
                    <p className="flex-1 px-5">Time</p>
                  </div>
                  {[...Array(20)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b-1 py-5"
                    >
                      <p className="w-[49px] text-center">!</p>
                      <p className="flex-[2] border-l-1 border-r-1 px-5">
                        Wake up device
                      </p>
                      <p className="flex-1 px-5">23.09.2024 13:37</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="flex flex-col flex-1">
              <p className="font-[600] text-[14px]">Live Video</p>
              <div className="flex flex-col mt-5">
                <div className="flex items-center">
                  {liveItems.map((item, index) => (
                    <p
                      key={index}
                      className={`border-2 border-b-0 mr-2 relative after:absolute after:-bottom-2 after:left-0 after:content-[' '] after:w-full after:h-2 px-8 cursor-pointer ${index === activeLiveItemState ? 'py-3 after:bg-red-400 bg-red-400 text-white rounded-tl rounded-tr' : 'mt-5 bg-[#eee] text-[#000]'}`}
                      onClick={() => setActiveLiveItemState(index)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div className="p-5 flex flex-col border-2 bg-red-400">
                  <div className="min-h-[240px] border-2 border-black rounded mt-4 bg-white"></div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
        <ChatComponent />
      </motion.div>
      {/* <motion.div className="flex gap-24" variants={item}>
        <div className="flex flex-col min-w-[300px]">
          <p className="font-[600] text-[14px]">State</p>
          <div className="flex flex-col mt-5">
            <div className="flex items-center">
              {states.map((item, index) => (
                <p
                  key={index}
                  className={`border-2 border-b-0 mr-2 relative after:absolute after:-bottom-2 after:left-0 after:content-[' '] after:w-full after:h-2 px-8 cursor-pointer ${index === activeState ? 'py-3 after:bg-red-400 bg-red-400 text-white rounded-tl rounded-tr' : 'mt-5 bg-[#eee] text-[#000]'}`}
                  onClick={() => setActiveState(index)}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="p-5 flex flex-col border-2 bg-red-400">
              <div>
                <p className="text-white">Normal State</p>
              </div>
              <div className="min-h-[240px] border-2 border-black rounded mt-4 bg-white">
                <div className="flex items-center border-b-2 border-b-black bg-[#888] text-white px-4 py-2">
                  <p className="mr-6">State</p>
                  <p>Message</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-auto">
          <p className="font-[600] text-[14px]">Control commands</p>
          <div className="flex-1 grid grid-cols-4 gap-[10px] border-2 border-black p-5 rounded mt-32">
            {controlCommands?.map((item, index) => (
              <p
                key={index}
                className="border-2 border-black rounded flex items-center justify-center text-center text-[12px] min-h-[80px] font-[400]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-auto">
          <p className="font-[600] text-[14px]">Device</p>
          <div className="mt-10 w-[150px] h-full flex flex-col border-2 rounded border-black"></div>
        </div>
      </motion.div> */}
      {/* <motion.div className="flex gap-24 mt-48" variants={item}>
        <div className="flex-[2]">
          <p className="font-[600] text-[14px]">Events</p>
          <div className="border-2 rounded border-black mt-5">
            <div className="flex items-center p-5">
              <select className="border-2 mr-5">
                <option>Message</option>
                <option>2</option>
                <option>3</option>
              </select>
              <input className="border-2 border-black" />
              <button className="border-2 ml-5 px-5 border-black rounded">
                +
              </button>
            </div>
            <div className="bg-[#fefefe] max-h-[250px] overflow-y-auto p-5">
              <div className="flex items-center border-b-1 py-5">
                <p className="mr-16">State</p>
                <p className="flex-[2] border-l-1 border-r-1 px-5">Message</p>
                <p className="flex-1 px-5">Time</p>
              </div>
              {[...Array(20)].map((_, index) => (
                <div key={index} className="flex items-center border-b-1 py-5">
                  <p className="w-[49px] text-center">!</p>
                  <p className="flex-[2] border-l-1 border-r-1 px-5">
                    Wake up device
                  </p>
                  <p className="flex-1 px-5">23.09.2024 13:37</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-[600] text-[14px]">Live Video</p>
          <div className="flex flex-col mt-5">
            <div className="flex items-center">
              {liveItems.map((item, index) => (
                <p
                  key={index}
                  className={`border-2 border-b-0 mr-2 relative after:absolute after:-bottom-2 after:left-0 after:content-[' '] after:w-full after:h-2 px-8 cursor-pointer ${index === activeLiveItemState ? 'py-3 after:bg-red-400 bg-red-400 text-white rounded-tl rounded-tr' : 'mt-5 bg-[#eee] text-[#000]'}`}
                  onClick={() => setActiveLiveItemState(index)}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="p-5 flex flex-col border-2 bg-red-400">
              <div className="min-h-[240px] border-2 border-black rounded mt-4 bg-white"></div>
            </div>
          </div>
        </div>
      </motion.div> */}
      {/* <div className="">
        <p>State</p>
        <div className="mt-5 w-[150px] h-full flex flex-col bg-[#ccc] rounded"></div>
      </div> */}
      {/* <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <OverdueWidget />
      </motion.div>
      <motion.div variants={item}>
        <IssuesWidget />
      </motion.div>
      <motion.div variants={item}>
        <FeaturesWidget />
      </motion.div>
      <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
        <GithubIssuesWidget />
      </motion.div>
      <motion.div
        variants={item}
        className="sm:col-span-2 md:col-span-4 lg:col-span-2"
      >
        <TaskDistributionWidget />
      </motion.div>
      <motion.div
        variants={item}
        className="sm:col-span-2 md:col-span-4 lg:col-span-2"
      >
        <ScheduleWidget />
      </motion.div> */}
    </motion.div>
  );
}

export default HomeTab;
