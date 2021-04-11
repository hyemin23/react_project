import { useCallback, useState } from "react"

export default (init = null) => {
    const [value, setValue] = useState(init);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    //변수와 그 변수를 set 해주는 useCallback함수를 돌려줌
    return [value, handler, setValue];
}