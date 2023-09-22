import React, { useEffect, useState } from 'react';

function Unsplash() {
    const [theme, setTheme] = useState("lightTheme");
    const modeChage = () => {
        // theme === "darkTheme" ? setTheme("lightTheme") : setTheme('darkTheme');
        if (theme === "darkTheme") {
            setTheme("lightTheme")
        }
        else {
            setTheme('darkTheme')
        }
    }


    const api = `https://api.unsplash.com/photos?client_id=MGChkos1Hmc6ebq88vh8tM8pNYisZqyHJTeR5jZQDW0`;
    const [image, setImage] = useState([]);
    const [search, setSearch] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        const link = `https://api.unsplash.com/search/photos?&query=${search}&client_id=MGChkos1Hmc6ebq88vh8tM8pNYisZqyHJTeR5jZQDW0`;
        const res1 = await fetch(link);
        const data1 = await res1.json();
        console.log(data1.results);
        setImage(data1.results);
    };
    useEffect(() => {
        async function splash() {
            const res = await fetch(api);
            const data = await res.json();
            console.log(data);
            setImage(data);
        }
        splash();
    }, []);



    // Theme Section

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <>
            <center>
                <div className='main'
                    style={{
                        // backgroundColor: '#CFCFCF',
                        marginBottom: '50px',
                    }}
                >
                    <input
                        style={{
                            height: '30px',
                            margin: '12px',
                            borderRadius: '12px',
                            borderColor: 'rgba(255, 195, 0 )',
                            // border: 'none',
                        }}
                        type="text"

                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    // onKeyUp={handleClick}
                    />
                    <button onClick={handleClick}> click me </button>

                    {theme === "lightTheme" ?
                        <button onClick={modeChage}>Dark Mode</button>
                        : <button onClick={modeChage}>light Mode</button>

                    }
                    {/* if(theme === "lightTheme"){
            <button onClick={modeChage}>Dark Mode</button>

          }
          else{
            <button onClick={modeChage}>light Mode</button>

          } */}
                </div>
            </center>
            <div style={{
                height: "200px",
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                // background:"black"

                // border:"2px solid yellow"


            }}>
                {image?.map((pack) => {
                    const { id, likes, urls } = pack;
                    return (
                        <>
                            <div key={id} style={{
                                // border: "2px solid yellow"

                            }}>
                                <div>{likes}</div>
                                <img style={{
                                    height: "300px",
                                }} src={urls.small} alt="" />
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default Unsplash;
