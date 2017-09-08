function getCurrentPosition() {
    // 브라우저/내비게이터 지원 확인
    if (navigator.geolocation) {
        let options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
        //navigator.geolocation.watchPosition(getUserPosition, trackError, options); // 깜빡임 발생
        navigator.geolocation.getCurrentPosition(getUserPosition, trackError, options);
    } else {
        alert("Geolocation이 지원되지 않습니다.");
    }
    // 사용자 위치를 가져와 지도에 아이콘으로 표시
    function getUserPosition(position) {
        // 위도와 경도 확인
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        // 사용자 좌표 생성
        let googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
            zoom: 12,
            center: googlePos,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // HTML div를 얻기 위한 변수 설정
        let mapObj = document.getElementById('map');
        // 지도와 passing 생성: map div와 map 옵션
        let googleMap = new google.maps.Map(mapObj, mapOptions);
        // 사용자 위치로 지도에 마커 설정
        let markerOption = {
            map: googleMap,
            position: googlePos,
            animation: google.maps.Animation.DROP
        };
        // 지도의 마커 인스턴스 생성
        let googleMarker = new google.maps.Marker(markerOption);
        // 지오코더로 사용자의 완전한 주소 정보 가져오기
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': googlePos
        }, function(results, status){
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    let popOpts = {
                        content: results[1].formatted_address,
                        position: googlePos
                    };
                    // 사용자 정보가 담긴 정보 창 설정
                    let popup = new google.maps.InfoWindow(popOpts);
                    google.maps.event.addListener(googleMarker, 'click', () => {
                        popup.open(googleMap);
                    });
                } else {
                    alert("결과가 없습니다.");
                }
            } else {
                alert("failed: "+status);
            }
        });
    }
    // 에러 함수 설정
    function trackError(error) {
        let err = document.getElementById('map');
        switch (error.code) {
            case error.PERMISSION_DENIED:
                err.innerHTML = "User denied Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                err.innerHTML = "Information is unavailable.";
                break;
            case error.TIMEOUT:
                err.innerHTML = "Location timed out.";
                break;
            case error.UNKNOWN_ERROR:
            err.innerHTML = "An unknown error.";
            break;
        }
    }
}
getCurrentPosition();