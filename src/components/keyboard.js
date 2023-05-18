const Keyboard = ({value,setvalue,level,turn})=> {
    const set_word = (e) => {
        if (level && turn === 2){
            if (e.target.value === 'remove'){
                value = value.slice(0,-1)
                setvalue(value)
            }else {
                value += e.target.value
                setvalue(value)
            }
        }
    }
    return<div className={'keyboard'}>
        <div className={'w-full'}>
            <input onClick={set_word} id={'Q'} value={'Q'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'W'} value={'W'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'E'} value={'E'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'R'} value={'R'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'T'} value={'T'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'Y'} value={'Y'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'U'} value={'U'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'I'} value={'I'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'O'} value={'O'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'P'} value={'P'} type={"button"} className={'letters'} />
        </div>
        <div className={'w-full'}>
            <input onClick={set_word} id={'A'} value={'A'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'S'} value={'S'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'D'} value={'D'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'F'} value={'F'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'G'} value={'G'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'H'} value={'H'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'J'} value={'J'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'K'} value={'K'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'L'} value={'L'} type={"button"} className={'letters'} />
        </div>
        <div className={'w-full'}>
            <input onClick={set_word} id={'Z'} value={'Z'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'X'} value={'X'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'C'} value={'C'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'V'} value={'V'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'B'} value={'B'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'N'} value={'N'} type={"button"} className={'letters'} />
            <input onClick={set_word} id={'M'} value={'M'} type={"button"} className={'letters'} />
            <input onClick={set_word} value={'remove'} type={"button"} className={'letters'} />
        </div>
    </div>
}
export default Keyboard