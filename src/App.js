import './App.css';
import {words} from "./words";
import Keyboard from "./components/keyboard";
import {useState, useEffect} from "react";

function App() {
    const words_list = words.split(',')
    const [forbot, setForbot] = useState(words_list)
    const [word, setWord] = useState('')
    const [last_word, setLast_word] = useState('')
    const [select_word, setSelect_word] = useState('')
    const [list, setList] = useState([])
    const [words_bot, setWords_bot] = useState([])
    const [bot, setBot] = useState('')
    const [find, setFind] = useState([])
    const [findbot, setFindbot] = useState([])
    const [level, setLevel] = useState(0)
    const [trash, setTrash] = useState([])
    const [turn, setTurn] = useState(1)
    const [time, setTime] = useState(30)
    useEffect(() => {
        if (level !== 0) {
            setWords_bot([...words_bot, bot])
            if (bot === select_word && select_word !== '') {
                alert(`bot is winner! word was ${bot}`)
                end_game()
            }
        }
    }, [bot])
    const rest_game = () => {
        const random = Math.floor(Math.random() * words_list.length);
        setSelect_word(words_list[random])
        setForbot(words_list)
        setWords_bot([])
        setTrash([])
        setFind([])
        setList([])
        setWord('')
        setTime(30)
        setTurn(1)
        Array.from(document.getElementsByName('level')).map((e) => {
            e.checked = false
        })
        Array.from(document.getElementsByClassName('letters')).map(e => e.style.background = 'rgba(255, 255, 255, 0.2)')

    }
    const end_game = () => {
        setBot('')
        setSelect_word('')
        setForbot(words_list)
        setTrash([])
        setFind([])
        setList([])
        setWord('')
        setTime(30)
        setTurn(1)
        setLevel(0)
        setWords_bot([])
        Array.from(document.getElementsByName('level')).map((e) => {
            e.checked = false
        })
        Array.from(document.getElementsByClassName('letters')).map(e => e.style.background = 'rgba(255, 255, 255, 0.2)')
    }
    const robot = () => {
        if (level === 1) {
            const random = Math.floor(Math.random() * words_list.length);
            setBot(words_list[random])
            setTurn(2)
        } else if (level === 2) {
            const random = Math.floor(Math.random() * forbot.length);
            setBot(forbot[random])
            bot.split('').map((e) => {
                if (select_word.includes(e)) {
                    if (!findbot.includes(e)) {
                        findbot.push(e)
                        setFindbot(findbot)
                    }
                }
            })
            if (findbot.length) {
                const new_list = forbot.filter((e) => {
                    if (e.split('').some(r => findbot.includes(r))) {
                        return e
                    }
                })
                setForbot(new_list)
            }
            setTurn(2)


        } else if (level === 3) {
            const random = Math.floor(Math.random() * forbot.length);
            setBot(forbot[random])
            if (select_word !== '') {
                let new_words = forbot.filter((e) => {
                    return e !== bot
                })
                console.log(bot)
                if (bot.length) {
                    bot.split('').map((e, i) => {
                        if (e === select_word[i]) {
                            const new_word = new_words.filter((z) => {
                                return z[i] === e
                            })
                            new_words = new_word
                            setForbot(new_word)
                        }
                    })
                }
            }
            setTurn(2)

        }

    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((t) => t - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        if (turn === 1 && level) {
            robot()
        }
        setTime(30)
    }, [turn])
    useEffect(() => {
        if (time === 0 && turn === 2) {
            end_game()
            setLevel(0)
            alert('you are loser')
        }
    }, [time])
    useEffect(() => {
        if (word.length === 5) {
            if (word === select_word) {
                alert('you are winner')
                end_game()
                const random = Math.floor(Math.random() * words_list.length);
                setSelect_word(words_list[random])
                Array.from(document.getElementsByClassName('letters')).map(e => e.style.background = 'rgba(255, 255, 255, 0.2)')
            } else {
                setList([...list, word])
                if (!words_list.includes(word)) {
                    alert('invalid word')
                }
                word.split('').map((e) => {
                    if (select_word.search(e) !== -1) {
                        if (!find.includes(e)) {
                            find.push(e)
                            setFind([...find])
                        }
                    } else {
                        if (!trash.includes(e)) {
                            trash.push(e)
                            setTrash([...trash])
                        }
                    }
                })
                setLast_word(word)
                setWord('')
                setTurn(1)
            }
        }
    }, [word])
    useEffect(() => {
        if (find.length) {
            find.map((e, i) => {
                if (last_word.search(e) === -1) {
                    document.getElementById(e).style.background = 'rgb(218 165 32 / 70%)'
                } else {
                    if (last_word.search(e) === select_word.search(e)) {
                        document.getElementById(e).style.background = 'rgb(32 218 72 / 70%)'
                    } else {
                        document.getElementById(e).style.background = 'rgb(218 165 32 / 70%)'
                    }
                }
            })
        }
    }, [last_word])
    useEffect(() => {
        if (trash.length) {
            trash.map((e) => {
                document.getElementById(e).style.background = 'rgb(84 110 122 / 70%)'
            })
        }
    }, [last_word])
    useEffect(() => {
        if (level !== 0) {
            rest_game()
            robot()
        }
    }, [level])
    return (<div className="App">
        <div>
            <p>level</p>
            <div>
                <label>
                    <input type={"radio"} value={1} defaultValue={level} name={'level'} onClick={() => {
                        setLevel(1)
                    }}/>
                    easy
                </label>
                <label>
                    <input type={"radio"} value={2} defaultValue={level} name={'level'} onClick={() => {
                        setLevel(2)
                    }}/>
                    mid
                </label>
                <label>
                    <input type={"radio"} value={3} defaultValue={level} name={'level'} onClick={() => {
                        setLevel(3)
                    }}/>
                    hard
                </label>
            </div>
        </div>
        <div>
            <p>{level ? time : ''}</p>
        </div>
        <p>{level ? select_word : ''}</p>
        <input id={'input_words'} defaultValue={word} type={'text'} maxLength={5} disabled={true}/>
        <div className={'lists'}>
            <div>
                <p>checked words</p>
                <div className={'words_list'}>
                    {list.length ? list.map((e) => {
                        return <div className={'flex'}>{e.split('').map((z, i) => {
                            return <p
                                className={select_word.search(z) !== -1 ? last_word.search(z) === select_word.search(z) ? 'green' : 'yellow' : 'white'}>{z}</p>
                        })}{}</div>
                    }) : <p>Try a word</p>}
                </div>
            </div>
            <div>
                <p>checked words bot </p>
                <div className={'words_list'}>
                    {words_bot.length ? words_bot.map((e) => {
                        return <div className={'flex'}>{e}</div>
                    }) : <p>Try a word</p>}
                </div>
            </div>
        </div>
        <Keyboard turn={turn} level={level} value={word} setvalue={setWord}/>
    </div>);
}

export default App;
