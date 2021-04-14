exports.isLoggedIn = (req, res, next) => {

    console.log(req.isAuthenticated());
    //isAuthenticated는 passport에서 지원해주는 메서드
    //인증된 사용자일 경우
    if (req.isAuthenticated()) {
        console.log("인증된 서용자입니다.");
        //next()를 2가지 사용 방법으로 이루어짐
        //next(값)에 어떤 값을 넣을 경우 에러를 전송
        //next()를 그냥 사용할 경우 다음 middle ware로 감
        next();
    } else {
        console.log("인증 실패");
        res.status(401).send("로그인이 필요합니다.");
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    //로그인을 하지 않은 경우에만 다음 미들웨어 동작하게끔
    if (!req.isAuthenticated()) {
        //다음 미들 웨어로 보내버림
        next();
    } else {
        res.status(401).send("로그인 하지 않은 사용자만 접근 가능합니다.");
    }
}