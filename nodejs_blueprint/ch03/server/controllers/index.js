// 홈화면 보여주기
exports.show = (req, res) => {
    // 홈 화면 렌더링
    res.render('index', {
        title: '멀티미디어 어플리케이션',
        callToAction: 'Node.js로 파일을 쉽게 업로드하고 다루는 방법'
    });
};