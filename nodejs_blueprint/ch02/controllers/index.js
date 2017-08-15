// 샘플 밴드 목록
exports.show = (req, res) => {
    // Band 전체 목록을 날짜별로 정렬
    let topBands = [
        {
            name: 'Motorhead',
            description: 'Rock and Roll Band',
            album: 'http://s2.vagalume.com/motorhead/discografia/orgasmatron-W320.jpg',
            year:'1986',
        },
        {
            name: 'Judas Priest',
            description: 'Heavy Metal band',
            album: 'http://s2.vagalume.com/judas-priest/discografia/screaming-for-vengeance-W320.jpg',
            year:'1982',
        },
        {
            name: 'Ozzy Osbourne',
            description: 'Heavy Metal Band',
            album: 'http://s2.vagalume.com/ozzy-osbourne/discografia/diary-of-a-madman-W320.jpg',
            year:'1981',
        }
    ];

    res.render('index', {
        title: '80년대 최고의 앨범',
        callToAction: '환영합니다. 아래 버튼을 눌러 당신의 앨범을 등록해보세요.',
        bands: topBands
    });
};
