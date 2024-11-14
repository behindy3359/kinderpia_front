import React, { useEffect, useState } from 'react';
import PlaceList from '../components/common/PlaceList';
import MeetingList from '../components/common/MeetingList';
import { PlaceListInfo } from '../types/placelist';
import { MettingListInfo } from '../types/meetinglist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { getPlaces } from '../api/placelist';
import { getMeetingListOpen } from '../api/meetinglist';
import '../styles/MainPage.scss';
import { MainBanner } from '../components/MainBanner';
import { formatDetailDate } from '../utils/formatDate';
import Joyride, { Step } from 'react-joyride';

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]); // 장소 목록 관리
  const [meetingList, setMeetingList] = useState<MettingListInfo[]>([]); // 모임 목록 관리
  const [run, setRun] = useState(false); // Joyride 상태 관리

  const steps: Step[] = [
    {
      target: '#help-info',
      placement: 'left',
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            해당 페이지의 <span className="accent">사용법</span>을 소개합니다.
          </p>
          <p>
            건너뛰시려면 왼쪽 하단의
            <br />"<span className="accent">Skip</span>"을 눌러주세요!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.nav-icon',
      placement: 'left',
      content: (
        <div className="joyride-content">
          <p>여기는 메뉴탭입니다.</p>
          <p>
            누르시면 모임검색, 장소검색, 회원가입, 로그인, 로그아웃 등을
            이용할수 있습니다.
          </p>
          <p>모임검색 : 다양한 모임을 검색하고 확인할수 있습니다.</p>
          <p>장소검색 : 아이와 함께 즐길 장소를 검색하고 확인할 수 있습니다.</p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.nav-list',
      placement: 'left',
      content: (
        <div className="joyride-content">
          <p>'여기는 내비게이션 바의 목록입니다.</p>
          <p>원하는 페이지로 이동하세요.'</p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.placelist-container', // 인기 장소 섹션
      content: (
        <div className="joyride-content">
          <p>'여기는 인기 장소 목록입니다.</p>
          <p>더보기를 누르면 더 많은 장소를 둘러볼수있습니다.'</p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meetinglist-container', // 신규 모임 섹션
      content: (
        <div className="joyride-content">
          <p>'여기는 신규 모임 목록입니다.</p>
          <p>더보기를 눌러 다양한 모임들을 확인해보세요 '</p>
        </div>
      ),
      disableBeacon: true,
    },
  ];

  // GET) 장소목록데이터 가져오기
  const getPlaceList = async () => {
    try {
      const data = await getPlaces({
        // sort: 'star',
        page: 0,
        size: 8,
      });
      console.log(`place data>>>>`, data.data.content);

      setPlaceList(data.data.content);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  // GET) 모임목록데이터 가져오기
  const getMeetingList = async () => {
    try {
      const data = await getMeetingListOpen({
        // sort: 'open',
        // page: 1,
        // size: 3,
      });
      console.log('meetingdata >>>>', data.data.dataList);

      setMeetingList(data.data.dataList);
    } catch (error) {
      console.log('모임목록 가져오는 중 에러 발생!', error);
    }
  };

  useEffect(() => {
    getPlaceList();
    getMeetingList();
  }, []);

  return (
    <section id="main">
      <div>
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showSkipButton={true}
          styles={{
            options: {
              backgroundColor: '#fff', // 배경색
              primaryColor: '#59a4d6', // 주요 색상
              textColor: '#333', // 텍스트 색상
              arrowColor: '#fff', // 화살표 색상
              width: '300px', // 너비 조정
            },
          }}
          callback={(data) => {
            const { status } = data;
            if (status === 'finished' || status === 'skipped') {
              setRun(false);
            }
          }}
        />
        <button
          type="button"
          id="help-info"
          title="도움말"
          onClick={() => setRun(true)} // 버튼 클릭 시 튜토리얼 시작
        >
          <i className="xi-info-o help-info-icon"></i>
        </button>
        <MainBanner />
      </div>
      <section className="placelist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">인기 장소</h2>
            <p className="add">아이들과 함께 특별한 하루를 만들어보세요!</p>
          </div>
          <Link to={'/place'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          modules={[Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="swiper"
        >
          {placeList.map((place) => (
            <SwiperSlide key={place.placeId}>
              <PlaceList
                key={place.placeId}
                placeId={place.placeId}
                placeName={place.placeName}
                placeCtgName={place.placeCtgName}
                averageStar={place.averageStar}
                paid={place.paid}
                placeImg={place.placeImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="meetinglist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">신규 모임</h2>
            <p className="add">
              다양한 가족들과 함께하는 특별한 시간, 지금 시작해 보세요!
            </p>
          </div>
          <Link to={'/meeting'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <div className="meetingcard">
          {meetingList.length === 0 ? (
            <p className="no-meeting">모임이 없습니다.</p>
          ) : (
            meetingList
              .slice(0, 4)
              .map((meeting) => (
                <MeetingList
                  key={meeting.meetingId}
                  meetingId={meeting.meetingId}
                  meetingTitle={meeting.meetingTitle}
                  meetingCategory={meeting.meetingCategory}
                  createdAt={meeting.createdAt}
                  district={meeting.district}
                  meetingLocation={meeting.meetingLocation}
                  meetingTime={formatDetailDate(meeting.meetingTime)}
                  nickname={meeting.nickname}
                  capacity={meeting.capacity}
                  totalCapacity={meeting.totalCapacity}
                  meetingStatus={meeting.meetingStatus}
                  profileImg={meeting.profileImg}
                />
              ))
          )}
        </div>
      </section>
    </section>
  );
}

export default MainPage;
