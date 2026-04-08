// 1. 전 교사 월~금 4교시 수업 유무 데이터
const weeklySchedule = {
  "구다희": [false, true, false, true, false],
  "강지훈": [false, true, true, true, true],
  "기술가정대체": [true, true, true, false, true],
  "김금나": [true, true, true, false, false],
  "김미현": [false, false, true, true, false],
  "김민지": [true, true, false, false, true],
  "김보영": [true, true, false, false, true],
  "김소연": [false, true, false, false, true],
  "김예승": [false, false, false, true, false],
  "김우현": [false, false, false, true, true],
  "김인경": [true, true, true, false, false],
  "김채민": [true, true, true, false, true],
  "김태완": [true, true, false, false, false],
  "김향미": [false, false, false, false, false],
  "김현지": [false, false, true, true, false],
  "고혜미": [false, false, false, false, false],
  "고윤": [false, false, true, true, true],
  "김형욱": [true, false, true, true, false],
  "김혜란": [true, true, false, false, true],
  "남수정": [false, false, true, true, false],
  "박범직": [false, false, true, true, true],
  "박상희": [true, false, false, false, true],
  "박소담": [false, true, false, false, true],
  "박예린": [false, false, false, false, false],
  "박진영": [false, true, true, true, true],
  "박현경": [true, false, true, false, false],
  "배재열": [false, true, true, true, true],
  "변은진": [false, true, true, true, true],
  "서정은": [false, false, false, true, false],
  "서지연": [true, true, true, true, true],
  "신예서": [true, true, true, true, true],
  "신예원": [true, true, false, false, true],
  "심지혜": [true, true, false, false, true],
  "안예성": [false, false, false, false, false],
  "연서우": [true, true, true, true, false],
  "오미영": [false, true, true, true, true],
  "오슬빈": [true, false, false, true, false],
  "오용준": [true, false, true, true, false],
  "유진영": [false, true, false, true, true],
  "유하경": [true, false, true, true, false],
  "윤지수": [true, true, false, false, true],
  "윤현정": [false, true, true, true, true],
  "이상직": [true, true, false, true, true],
  "이영재": [true, false, true, true, false],
  "이주현": [false, false, true, false, true],
  "이지원": [true, false, true, true, false],
  "이태우": [true, false, true, false, true],
  "이후민": [false, false, false, false, false],
  "임수진": [true, false, true, true, false],
  "장미경": [false, false, false, false, false],
  "전선영": [false, false, false, false, false],
  "정광윤": [true, false, false, false, false],
  "정한별": [true, false, false, false, false],
  "조다은": [false, true, false, false, true],
  "조수진": [false, true, false, true, false],
  "조영욱": [false, false, true, true, false],
  "최민호": [true, false, true, false, true],
  "최유빈": [true, true, true, false, false],
  "최태석": [true, true, false, true, true],
  "홍지선": [false, false, true, true, true],
  "황세은": [false, true, true, false, true],
  "황수연": [true, true, false, true, false]
};

// 2. 부서별 교직원 구성
const departmentData = [
  {
    department: "🍎 1학년부",
    members: ["서정은", "김인경", "조영욱", "김태완", "김채민", "김현지", "고혜미", "이상직", "박상희", "박범직", "조수진"]
  },
  {
    department: "🌳 2학년부",
    members: ["정광윤", "김형욱", "황세은", "정한별", "구다희", "김보영", "최태석", "조다은", "심지혜", "홍지선"]
  },
  {
    department: "🎓 3학년부",
    members: ["강지훈", "신예서", "오슬빈", "오미영", "배재열", "최유빈", "김혜란", "유하경", "박진영", "남수정", "윤지수", "임수진", "김예승"]
  },
  {
    department: "📂 교무지원센터",
    members: ["서지연", "윤현정", "황수연", "김민지", "김소연", "최민호", "이태우", "이영재", "김미현"]
  },
  {
    department: "💡 미래평생진로부",
    members: ["김금나", "신예원", "박현경", "변은진", "유진영", "장미경"]
  },
  {
    department: "🥊 학생생활안전부",
    members: ["이주현", "연서우", "오용준", "박소담"]
  },
  {
    department: "💻 교육정보부",
    members: ["이지원", "고윤"]
  },
  {
    department: "👟 체육부",
    members: ["김우현"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const selectionView = document.getElementById("selection-view");
  const detailView = document.getElementById("detail-view");
  const selectionMenu = document.getElementById("selection-menu");
  const dayTabsContainer = document.getElementById("day-tabs");
  const backBtn = document.getElementById("back-btn");
  const appGrid = document.getElementById("app-grid");
  const mainTitle = document.getElementById("main-title");

  // 상태 관리
  let selectedDayIndex = 0; // 0=Mon, 1=Tue, ..., 4=Fri
  let currentViewingDept = null; // 현재 상세 보기 중인 부서

  // 날짜 계산 보조 함수
  function getDayDate(targetIndex) {
    const now = new Date();
    const currentDay = now.getDay(); // 0(일)~6(토)
    const diff = (targetIndex + 1) - currentDay;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const date = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  }

  // 초기 설정: 오늘 요일에 맞춰 selectedDayIndex 설정 (주말이면 월요일)
  const todayIndex = new Date().getDay();
  if (todayIndex === 0 || todayIndex === 6) {
    selectedDayIndex = 0; // 월요일
  } else {
    selectedDayIndex = todayIndex - 1;
  }

  // 1. 요일 탭 렌더링
  function renderDayTabs() {
    dayTabsContainer.innerHTML = "";
    const days = ["월", "화", "수", "목", "금"];
    const today = new Date().getDay();

    days.forEach((day, index) => {
      const tab = document.createElement("button");
      tab.className = `day-tab ${index === selectedDayIndex ? "active" : ""}`;
      
      // 날짜 라벨 추가 (예: 4/8)
      const dateStr = getDayDate(index); // YYYY-MM-DD
      const [_, m, d] = dateStr.split('-');
      const dateLabel = document.createElement("span");
      dateLabel.className = "date-label";
      dateLabel.innerText = `${parseInt(m)}/${parseInt(d)}`;
      tab.appendChild(dateLabel);

      const dayLabel = document.createElement("span");
      dayLabel.innerText = day;
      tab.appendChild(dayLabel);

      if (index === today - 1) {
        const todayLabel = document.createElement("span");
        todayLabel.className = "today-label";
        todayLabel.innerText = "오늘";
        tab.appendChild(todayLabel);
      }

      tab.onclick = () => {
        selectedDayIndex = index;
        updateUI();
      };
      
      dayTabsContainer.appendChild(tab);
    });
  }

  // UI 전체 업데이트 (요일 변경 시 호출)
  function updateUI() {
    const dayNames = ["월요일", "화요일", "수요일", "목요일", "금요일"];
    const now = new Date();
    const isWeekend = (now.getDay() === 0 || now.getDay() === 6);
    
    // 타이틀 업데이트
    mainTitle.innerText = `두루고 오늘의 밥친구`;
    
    renderDayTabs();

    // 주말이고 오늘 요일을 선택한 경우 (사실 탭은 월~금만 있지만)
    // 여기서는 사용자가 자유롭게 월~금을 볼 수 있게 하되, 주말임을 알리는 메시지는 선택적으로 표시
    // 사용자가 '내일이 궁금할 수도 있잖아'라고 했으므로 주말에도 월~금 데이터를 자유롭게 보게 함

    if (currentViewingDept) {
      showDepartmentDetail(currentViewingDept);
    } else {
      renderSelectionMenu();
    }
  }

  // 2. 부서 선택 메뉴 렌더링
  function renderSelectionMenu() {
    selectionMenu.innerHTML = "";
    selectionView.style.display = "block";
    detailView.style.display = "none";
    currentViewingDept = null;

    departmentData.forEach((dept) => {
      const btn = document.createElement("button");
      btn.className = "dept-btn glass-card";
      btn.innerText = dept.department;
      btn.onclick = () => showDepartmentDetail(dept);
      selectionMenu.appendChild(btn);
    });
  }

  // 3. 상세 부서 카드 렌더링
  function showDepartmentDetail(dept) {
    currentViewingDept = dept;
    appGrid.innerHTML = "";
    
    const hasClass = [];
    const noClass = [];

    dept.members.forEach(name => {
      const schedule = weeklySchedule[name];
      if (schedule && schedule[selectedDayIndex]) {
        hasClass.push(name);
      } else {
        noClass.push(name);
      }
    });

    const card = document.createElement("div");
    card.className = "dept-card glass-card fadeIn";

    const title = document.createElement("h2");
    title.className = "dept-title";
    title.innerText = dept.department;
    card.appendChild(title);

    if (noClass.length > 0) {
      const noClassSection = createSection("🟢 4교시 없음", noClass, "no-class");
      card.appendChild(noClassSection);
    }

    if (hasClass.length > 0) {
      const hasClassSection = createSection("🔴 4교시 있음", hasClass, "has-class");
      card.appendChild(hasClassSection);
    }

    appGrid.appendChild(card);

    selectionView.style.display = "none";
    detailView.style.display = "block";
    detailView.classList.add("fadeIn");
  }

  function createSection(titleText, names, badgeClass) {
    const section = document.createElement("div");
    section.className = "teacher-section";
    
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "section-title";
    sectionTitle.innerHTML = titleText;
    section.appendChild(sectionTitle);

    const badgeContainer = document.createElement("div");
    badgeContainer.className = "badge-container";

    names.forEach(name => {
      const badge = document.createElement("span");
      badge.className = `teacher-badge ${badgeClass}`;
      badge.innerText = name;
      badgeContainer.appendChild(badge);
    });

    section.appendChild(badgeContainer);
    return section;
  }

  backBtn.onclick = () => {
    currentViewingDept = null;
    renderSelectionMenu();
  };

  // 초기 실행
  updateUI();
});
