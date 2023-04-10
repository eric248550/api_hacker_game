import React, { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer'; 
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Select from 'react-select';
import AlertModal from "../alert";


import board from '../images/board.jpeg';
import hacker from '../images/hacker.png';
import toolbar from '../images/toolbar.png';
import user from '../images/user.png';
import reload from '../images/reload.png';

const frontend_code = `
async function request_api(method, url, body) {
    try {
        const response = await (await fetch(url,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            }
        )).json();

        if (response.error) {
            setAlertInformation({
                type: "information",
                isDisplayed: true,
                content: 'API request error:',
            });
            return;
        }

        const prettyJson = JSON.stringify(response, null, 2);
        setResponseJson(prettyJson);
    }
    catch (e) {
        setAlertInformation({
            type: "information",
            isDisplayed: true,
            content: 'API request error:',
        });
    }
}
`

const code = `function createStyleObject(classNames, style) {
    return classNames.reduce((styleObject, className) => {
      return {...styleObject, ...style[className]};
    }, {});
  }
  function createClassNameString(classNames) {
    return classNames.join(' ');
  }
  // this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully
  function createChildren(style, useInlineStyles) {
    let childrenCount = 0;
    return children => {
      childrenCount += 1;
      return children.map((child, i) => createElement({
        node: child,
        style,
        useInlineStyles,
        key:\`code-segment-$\{childrenCount}-$\{i}\`
      }));
    }
  }
  function createElement({ node, style, useInlineStyles, key }) {
    const { properties, type, tagName, value } = node;
    if (type === "text") {
      return value;
    } else if (tagName) {
      const TagName = tagName;
      const childrenCreator = createChildren(style, useInlineStyles);
      const props = (
        useInlineStyles
        ?
        { style: createStyleObject(properties.className, style) }
        :
        { className: createClassNameString(properties.className) }
      );
      const children = childrenCreator(node.children);
      return <TagName key={key} {...props}>{children}</TagName>;
    }
  }
`;

export default function Level1() {
    const [requestMethod, setRequestMethod] = useState("GET");
    const [requestUrl, setRequestUrl] = useState();
    const [requestBody, setRequestBody] = useState();
    const [responseJson, setResponseJson] = useState();
    const [shopItems, setShopItems] = useState();

    const [alertInformation, setAlertInformation] = useState({
        content: "",
        isDisplayed: false,
        type: "information",
    });

    useEffect(() => {
        getShopItems();
    }, [])

    async function request_api(method, url, body) {
        try {
            const response = await (await fetch(
                url,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: (requestMethod === 'POST') ? body : null
                }
            )).json();
    
            if (response.error) {
                setAlertInformation({
                    type: "information",
                    isDisplayed: true,
                    content: `API request error:\n\n${response.error}`,
                });
                return;
            }
    
            const prettyJson = JSON.stringify(response, null, 2);
            setResponseJson(prettyJson);
        }
        catch (e) {
            setAlertInformation({
                type: "information",
                isDisplayed: true,
                content: `API request error:\n\n${e}`,
            });
        }

    }

    async function getShopItems() {
        try {
            const response = await (await fetch(
                'http://localhost:8787/eshop/items/Eric'
            )).json();
            setShopItems(response);
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-black">
            <div className='w-full bg-[#acacac] h-12 flex'>
                <p className='m-auto text-white text-5xl'>
                    Level 1: Hello Web API
                </p>
            </div>
            {/* <div className="relative mx-auto flex flex-row w-5/6 h-60 bg-cover bg-no-repeat bg-[url('./images/board.jpeg')]"> */}
            <div className="relative mt-5 mx-auto flex flex-row w-5/6 h-72">
                {/* bg board */}
                <img className='absolute my-auto z-10 w-full h-72' src={board} />
                {/* hacker png / mission desc */}
                <div className='m-auto flex flex-row justify-center w-5/6 h-60 overflow-hidden'>
                    <div className='my-auto w-1/4 z-20'>
                        <img className='m-auto w-11/12 z-20' src={hacker}/>
                    </div>
                    <div className='ml-5 my-auto w-3/4 z-20'>
                        <p className='text-center text-white text-4xl z-20'>
                            Your Mission
                        </p>
                        <p className='text-white z-20'>
                            Welcome to the Web API hacker team! Your goal is to find the correct route for a Web API call that request all item in this e-shop.
                        </p>

                        <p className='mt-2 text-white z-20'>
                        Can you find the correct route for this Web API call? Good luck!
                        </p>
                    </div>
                </div>
            </div>
            {/* fake website / fake postman */}
            <div className='mt-5 mx-auto w-5/6 flex flex-row'>
                {/* fake website */}
                <div className='w-1/2 flex flex-col border-[1px] border-white'>
                    <img className='w-full' src={toolbar}/>

                    <div className='bg-white w-full h-auto'>
                        {/* member */}
                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='ml-2 text-black text-xl'>
                                E-SHOP
                            </p>
                            <div className='flex flex-row'>
                                <p className='my-auto text-black'>
                                    Eric
                                </p>
                                <img className='mx-2 w-8 h-8 rounded-full' src={user}/>
                            </div>
                        </div>
                        {/* reload */}

                        <button className='mt-2 mx-auto flex flex-row justify-center' onClick={getShopItems}>
                            <p className='my-auto text-black'>
                                Reload
                            </p>
                            <img className='ml-2 w-4 h-4' src={reload}/>
                        </button>
                        {/* items */}
                        {shopItems
                        ?
                            <div className='p-2 flex flex-wrap justify-center'>
                                {
                                    shopItems.map((item) => {
                                        return (
                                            <div className='flex flex-col justify-center w-20 h-auto border-black border-[1px] m-2'>
                                                <div className='mt-2 m-auto w-11/12 bg-white h-auto'>
                                                    <img src={item.image} className='mt-2 m-auto w-11/12 h-auto transition duration-300 hover:scale-105 hover:drop-shadow-xl'/>
                                                </div>
                                                <p className='mt-2 text-center text-base font-extrabold text-[#004D65]'>
                                                    {item.name}
                                                </p>
                
                                                <button className='transition duration-500 hover:scale-110 hover:drop-shadow-2xl m-auto mt-2 mb-5 bg-[#00C7E2] w-11/12 h-auto font-semibold text-white rounded-xl'>
                                                    <p>Buy</p>
                                                    <p>${item.price}</p>
                                                </button> 
                                            </div>
                                        );
                                    })
                                }
                    
                            </div>
                        :""
                        }
                    </div>
                </div>
                {/* fake postman */}
                <div className='ml-5 mx-auto w-1/2 flex flex-col'>
                    {/* method / URL / send */}
                    <div className='mx-auto flex flex-row w-full'>
                        <div className='w-1/6 flex justify-start'>
                            <Select
                                // classNames={{
                                //     control: (state) =>
                                //     state.isFocused ? 'border-red-600' : 'border-grey-300',
                                // }}
                                styles={customStyles}
                                placeholder="GET"
                                onChange={(event) => {
                                    setRequestMethod(event.value);
                                }}
                                options={
                                    [
                                        { value: 'GET', label: 'GET'},
                                        { value: 'POST', label: 'POST'},
                                    ]
                                }
                            />
                        </div>

                        <input type="text" className='border-[1px] border-white text-white text-sm w-2/3 h-10 text-center bg-black' required 
                            placeholder="Enter URL or paste text"
                            onChange={(event) => {
                                setRequestUrl(event.target.value);
                            }}
                        />

                        <button onClick={() => request_api(requestMethod, requestUrl, requestBody)}
                            className={`w-1/6 border-[1px] border-white text-white hover:text-black hover:bg-white`}>
                            <p className='m-auto'>
                            Request
                            </p>
                        </button>
                    </div>
                        {(requestMethod === 'POST')
                        ?
                            <textarea className='mt-2 bg-black border-[1px] border-white text-white text-sm h-28' 
                                placeholder="Entet request JSON body"
                                onChange={(event) => {
                                    setRequestBody(event.target.value);
                                }}
                            />
                        :""
                        }


                    <div className='mt-2 flex flex-col w-full border-[1px] border-white h-auto'>
                        <div className='w-full bg-[#acacac] h-8 flex'>
                            <p className='m-auto text-white text-lg'>
                                Response
                            </p>
                        </div>
                        <pre className="mt-2 mx-1 text-white text-xs break-words overflow-hidden">
                            {responseJson}
                        </pre>
                    </div>
                        
                </div>
            </div>

            <div className='mt-5 mx-auto w-5/6 flex flex-row'>
                <div className='w-1/2 flex flex-col border-[1px] border-white'>
                    <Tabs className='flex flex-col justify-center'>
                        <TabList className='w-full flex flex-row border-white text-white border-b-[1px] justify-start'>
                            <Tab>frontend.js</Tab>
                            <Tab>backend.js</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='flex flex-row border-[1px] border-white'>
                                <SyntaxHighlighter wrapLines={true} customStyle={{width: '100%'}} language="javascript" style={vs2015}>
                                    {frontend_code}
                                </SyntaxHighlighter>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='flex flex-row border-[1px] border-white'>
                                <SyntaxHighlighter wrapLines={true} customStyle={{width: '100%'}} language="javascript" style={vs2015}>
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
                <div className='w-1/2 flex flex-col'>


                </div>
            </div>



            {/* http://localhost:8787 */}
            <div className='p-10'></div>
            {alertInformation.isDisplayed && (
                    <AlertModal
                    type={alertInformation.type}
                    animateImg={alertInformation.animateImg}
                    imgWidth={alertInformation.imgWidth}
                    img={alertInformation.img}
                    onClose={() =>
                        setAlertInformation({
                        type: "information",
                        isDisplayed: false,
                        content: null,
                        })
                    }
                    >
                    {alertInformation.content}
                    </AlertModal>
                )}
        </div>
    );
}
const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: 'black',
        // borderRadius: '1rem',
        border: '1px solid #FFFFFF',
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#008BF0' : 'white',
        backgroundColor: 'black',
        // borderRadius: '1rem',
        margin: 'auto',
        flexDirection: 'row',
        display: 'flex',
        '&:hover': {
            backgroundColor: '#008BF0',
            color: 'white',
        }
    }),
    dropdownIndicator: () => ({
        color: 'white',
        width: '1.5rem',
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        backgroundColor: 'black',
        // borderRadius: '1rem',
        height: '2.5rem',
        width: '5rem',
        border: '1px solid #FFFFFF',
        margin: 'auto',
        flexDirection: 'row',
        display: 'flex',
    }),
    singleValue: () => ({
        color: 'white',
        position: 'absolute',
        left: '10px'
    }),
    placeholder: () => ({
        color: 'white',
        position: 'absolute',
        left: '10px'
    })
}