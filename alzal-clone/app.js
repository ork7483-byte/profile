/* ===== 알잘AI Clone - Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Login Page Tabs --- */
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* --- Create Page: Step Navigation --- */
  const steps = document.querySelectorAll('.step');
  const stepContents = document.querySelectorAll('.step-content');
  const stepLines = document.querySelectorAll('.step-line');
  const progressFill = document.querySelector('.progress-fill');

  function goToStep(num) {
    steps.forEach((s, i) => {
      s.classList.remove('active', 'completed');
      if (i + 1 < num) s.classList.add('completed');
      if (i + 1 === num) s.classList.add('active');
    });
    stepContents.forEach(c => c.classList.remove('active'));
    const target = document.getElementById('step' + num);
    if (target) target.classList.add('active');
    stepLines.forEach((l, i) => {
      l.classList.toggle('active', i < num - 1);
    });
    if (progressFill) {
      progressFill.style.width = (num / steps.length * 100) + '%';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Step 1 -> 2
  const nextStep1 = document.getElementById('nextStep1');
  if (nextStep1) nextStep1.addEventListener('click', () => goToStep(2));

  // Step 2 -> 3
  const nextStep2 = document.getElementById('nextStep2');
  if (nextStep2) nextStep2.addEventListener('click', () => goToStep(3));

  // Step 2 <- 1
  const prevStep2 = document.getElementById('prevStep2');
  if (prevStep2) prevStep2.addEventListener('click', () => goToStep(1));

  // Step 3 <- 2
  const prevStep3 = document.getElementById('prevStep3');
  if (prevStep3) prevStep3.addEventListener('click', () => goToStep(2));

  // Generate button -> navigate to final step
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      window.location.href = 'create-final.html';
    });
  }

  /* --- Create Page: Mode Card Selection --- */
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  /* --- Create Page: Section Option Selection --- */
  document.querySelectorAll('.section-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.section-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  /* --- Create Page: Channel Tag Selection --- */
  document.querySelectorAll('.channel-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.channel-tag').forEach(t => t.classList.remove('selected'));
      tag.classList.add('selected');
    });
  });

  /* --- Create Page: Language Dropdown --- */
  const langDisplay = document.getElementById('langDisplay');
  const langDropdown = document.getElementById('langDropdown');
  if (langDisplay && langDropdown) {
    langDisplay.addEventListener('click', () => {
      langDropdown.classList.toggle('show');
    });
    document.querySelectorAll('.select-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.select-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        langDisplay.innerHTML = opt.querySelector('span:first-child').innerHTML +
          ' <span class="select-arrow">∨</span>';
        langDropdown.classList.remove('show');
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select')) {
        langDropdown.classList.remove('show');
      }
    });
  }

  /* --- Create Page: AI Suggest Button --- */
  const aiSuggestBtn = document.getElementById('aiSuggestBtn');
  const aiSuggestions = document.getElementById('aiSuggestions');
  if (aiSuggestBtn && aiSuggestions) {
    aiSuggestBtn.addEventListener('click', () => {
      aiSuggestions.classList.toggle('show');
    });
    document.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const input = document.getElementById('categoryInput');
        if (input) input.value = item.dataset.category;
        aiSuggestions.classList.remove('show');
      });
    });
  }

  /* --- Create Page: AI Toggle --- */
  const aiToggleBtn = document.getElementById('aiToggleBtn');
  const aiOptions = document.getElementById('aiOptions');
  const aiBanner = document.getElementById('aiBanner');
  if (aiToggleBtn && aiOptions) {
    let aiOpen = true;
    aiToggleBtn.addEventListener('click', () => {
      aiOpen = !aiOpen;
      aiOptions.style.display = aiOpen ? 'block' : 'none';
      if (aiBanner) aiBanner.style.display = aiOpen ? 'flex' : 'none';
      const arrow = aiToggleBtn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = aiOpen ? '∧' : '∨';
    });
  }

  /* --- Final Step: Aspect Ratio Selection --- */
  document.querySelectorAll('.aspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.aspect-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  /* --- Final Step: File Upload --- */
  const dropzone = document.getElementById('uploadDropzone');
  const fileInput = document.getElementById('fileInput');
  const uploadedImages = document.getElementById('uploadedImages');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
    });
  }

  function handleFiles(files) {
    if (!uploadedImages) return;
    uploadedImages.style.display = 'flex';
    Array.from(files).slice(0, 3).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 5 * 1024 * 1024) { alert('파일 크기는 5MB 이하만 가능합니다.'); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        const wrap = document.createElement('div');
        wrap.className = 'uploaded-img-wrap';
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'uploaded';
        const removeBtn = document.createElement('button');
        removeBtn.className = 'uploaded-img-remove';
        removeBtn.textContent = '\u2715';
        removeBtn.addEventListener('click', () => wrap.remove());
        wrap.appendChild(img);
        wrap.appendChild(removeBtn);
        uploadedImages.appendChild(wrap);
      };
      reader.readAsDataURL(file);
    });
  }

  /* --- Final Step: Char Count --- */
  const imageNotes = document.getElementById('imageNotes');
  const charCount = document.getElementById('charCount');
  if (imageNotes && charCount) {
    imageNotes.addEventListener('input', () => {
      charCount.textContent = imageNotes.value.length;
    });
  }

  /* --- Final Step: Continue Button --- */
  const continueBtn = document.querySelector('.continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      window.location.href = 'interview.html';
    });
  }

  /* --- Interview Page: Choice Toggle --- */
  document.querySelectorAll('.choice-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('selected');
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.checked = item.classList.contains('selected');
    });
  });

  /* --- Info Icon Tooltip Toggle --- */
  const infoIcon = document.querySelector('.form-label .info-icon');
  const langTooltip = document.getElementById('langTooltip');
  if (infoIcon && langTooltip) {
    infoIcon.addEventListener('click', () => {
      langTooltip.style.display = langTooltip.style.display === 'block' ? 'none' : 'block';
    });
  }

  /* ===== Edit Plan Page ===== */

  const sectionListEl = document.getElementById('sectionList');
  if (sectionListEl) {

    // Section data array (10 sections)
    const sectionsData = [
      {
        title: '01. 프리미엄 히어로 – USP 한눈에',
        summary: '핵심 USP(30년 피부 전문가가 설계한 성분 우수 수분크림)와 고급스러운 비주얼을 결합한 첫인상 섹션',
        headCopy: '피부 전문 30년, 처방의 정수를 담은 수분크림',
        subCopy: '과학이 설계하고, 피부가 증명합니다',
        detailInfo: '• USP 한 줄: "피부 전문 30년 박사님이 만든 성분 – 장시간 보습·진정"\n• 제품명 + 용량 표기\n• 핵심 키워드 3~4개: 장시간 보습, 피부 진정, 노화방지, 프리미엄 성분\n• CTA 버튼: "지금 만나보기" or "특별 할인가 확인"',
        imageGuides: [
          '📸 투명 유리병 위 물방울이 맺힌 제품 단독 클로즈업(고해상도, 수분감 강조)',
          '📸 모델의 촉촉하게 빛나는 피부 클로즈업(자연광, 깨끗한 피부 결 표현)',
          '📸 물결이 이는 투명 수조 옆 제품 비주얼(프리미엄 무드, 반사광 활용)'
        ]
      },
      { title: '02. 공감 – 왜 금방 건조해질까요?', summary: '고객의 피부 건조 고민에 공감하며 문제를 제기하는 섹션', headCopy: '촉촉했던 피부, 왜 금방 건조해질까요?', subCopy: '건조함의 진짜 원인을 알아야 해결할 수 있습니다', detailInfo: '', imageGuides: ['📸 건조한 피부 클로즈업 이미지'] },
      { title: '03. 브랜드·연구 스토리 – 30년의 설계', summary: '30년 피부 전문 박사의 연구 스토리로 신뢰를 구축하는 섹션', headCopy: '30년의 연구, 단 하나의 크림에 담다', subCopy: '피부 전문 박사가 직접 설계한 처방', detailInfo: '', imageGuides: ['📸 연구실/박사 이미지'] },
      { title: '04. USP – 성분 우수성 중심의 차별화', summary: '핵심 성분과 차별화 포인트를 강조하는 섹션', headCopy: '다른 수분크림과는 차원이 다릅니다', subCopy: '우수 성분이 만드는 확실한 차이', detailInfo: '', imageGuides: ['📸 성분 인포그래픽 이미지'] },
      { title: '05. 체감 변화 – 보습 지속·진정', summary: '사용 후 체감할 수 있는 효과를 시각적으로 보여주는 섹션', headCopy: '바른 순간부터 달라지는 피부', subCopy: '장시간 보습과 즉각적인 진정 효과', detailInfo: '', imageGuides: ['📸 Before/After 피부 비교 이미지'] },
      { title: '06. 텍스처·사용감 – 산뜻한 흡수, 쫀쫀한 수분막', summary: '제품의 텍스처와 사용감을 감각적으로 전달하는 섹션', headCopy: '산뜻하게 흡수되고, 쫀쫀한 수분막', subCopy: '끈적임 없이 촉촉한 마무리', detailInfo: '', imageGuides: ['📸 크림 텍스처 클로즈업 이미지'] },
      { title: '07. 사용법 – 아침·밤 루틴 튜토리얼', summary: '아침/저녁 스킨케어 루틴에서 제품 사용법을 안내하는 섹션', headCopy: '아침·밤, 이렇게 사용하세요', subCopy: '간단한 3단계로 완성하는 촉촉 루틴', detailInfo: '', imageGuides: ['📸 스킨케어 루틴 단계별 이미지'] },
      { title: '08. 실사용 순간 – UGC & SNS 신뢰', summary: '실제 사용자 후기와 SNS 반응으로 신뢰를 높이는 섹션', headCopy: '실제 사용자들의 솔직한 후기', subCopy: 'SNS에서 화제가 된 리얼 후기', detailInfo: '', imageGuides: ['📸 SNS 후기 캡처/UGC 이미지'] },
      { title: '09. 신뢰·정책 – 테스트·성분·FAQ', summary: '품질 테스트 결과와 FAQ로 남은 의문을 해소하는 섹션', headCopy: '검증된 안전성, 투명한 성분', subCopy: '피부 자극 테스트 완료 · 전성분 공개', detailInfo: '', imageGuides: ['📸 테스트 인증서/성분표 이미지'] },
      { title: '10. 오퍼·CTA – 런칭 특가 & 세트 제안', summary: '런칭 특가 할인과 세트 구성으로 구매를 유도하는 마지막 섹션', headCopy: '지금이 가장 좋은 기회입니다', subCopy: '런칭 특별가 + 한정 세트 구성', detailInfo: '', imageGuides: ['📸 제품 세트 구성 이미지'] }
    ];

    let editCurrentSection = 0;
    const editSectionItems = sectionListEl.querySelectorAll('.section-list-item');
    const editProgressFill = document.getElementById('sectionProgress');
    const editProgressText = document.getElementById('sectionProgressText');

    // Load section data into form
    function loadSectionData(idx) {
      const data = sectionsData[idx];
      if (!data) return;
      const titleInput = document.getElementById('sectionTitle');
      const summaryInput = document.getElementById('sectionSummary');
      const headInput = document.getElementById('headCopy');
      const subInput = document.getElementById('subCopy');
      const detailInput = document.getElementById('detailInfo');
      const guideList = document.getElementById('imageGuideList');

      if (titleInput) titleInput.value = data.title;
      if (summaryInput) summaryInput.value = data.summary;
      if (headInput) headInput.value = data.headCopy;
      if (subInput) subInput.value = data.subCopy;
      if (detailInput) detailInput.value = data.detailInfo;

      if (guideList) {
        guideList.innerHTML = '';
        data.imageGuides.forEach(g => {
          const div = document.createElement('div');
          div.className = 'image-guide-item';
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'form-input';
          input.value = g;
          const btn = document.createElement('button');
          btn.className = 'remove-btn';
          btn.textContent = '제거';
          div.appendChild(input);
          div.appendChild(btn);
          guideList.appendChild(div);
        });
      }

      // Update progress
      const progress = ((idx + 1) / sectionsData.length * 100);
      if (editProgressFill) editProgressFill.style.width = progress + '%';
      if (editProgressText) editProgressText.textContent = Math.round(progress) + '%';

      // Update active section in list
      editSectionItems.forEach((item, i) => {
        item.classList.toggle('active', i === idx);
      });
    }

    // Save current section data from form
    function saveSectionData(idx) {
      const data = sectionsData[idx];
      if (!data) return;
      const titleInput = document.getElementById('sectionTitle');
      const summaryInput = document.getElementById('sectionSummary');
      const headInput = document.getElementById('headCopy');
      const subInput = document.getElementById('subCopy');
      const detailInput = document.getElementById('detailInfo');
      const guideList = document.getElementById('imageGuideList');

      if (titleInput) data.title = titleInput.value;
      if (summaryInput) data.summary = summaryInput.value;
      if (headInput) data.headCopy = headInput.value;
      if (subInput) data.subCopy = subInput.value;
      if (detailInput) data.detailInfo = detailInput.value;

      if (guideList) {
        data.imageGuides = Array.from(guideList.querySelectorAll('.form-input')).map(i => i.value);
      }
    }

    // Section list click
    editSectionItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        saveSectionData(editCurrentSection);
        editCurrentSection = i;
        loadSectionData(i);
      });
    });

    // Color swatch selection
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        const hexInput = document.querySelector('.color-hex-input');
        if (hexInput) hexInput.value = swatch.dataset.color;
      });
    });

    // Hex input sync
    const colorHexInput = document.querySelector('.color-hex-input');
    if (colorHexInput) {
      colorHexInput.addEventListener('input', () => {
        const val = colorHexInput.value;
        document.querySelectorAll('.color-swatch').forEach(s => {
          s.classList.toggle('selected', s.dataset.color.toLowerCase() === val.toLowerCase());
        });
      });
    }

    // Image guide add (event delegation)
    const addGuideBtn = document.getElementById('addImageGuide');
    if (addGuideBtn) {
      addGuideBtn.addEventListener('click', () => {
        const list = document.getElementById('imageGuideList');
        if (!list) return;
        const div = document.createElement('div');
        div.className = 'image-guide-item';
        div.innerHTML = '<input type="text" class="form-input" placeholder="📸 이미지 가이드를 입력하세요"><button class="remove-btn">제거</button>';
        list.appendChild(div);
      });
    }

    // Remove buttons (event delegation on document)
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
      }
    });

    // Advanced settings toggle
    const advToggleBtn = document.querySelector('.advanced-toggle-btn');
    const advSettings = document.getElementById('advancedSettings');
    if (advToggleBtn && advSettings) {
      advToggleBtn.addEventListener('click', () => {
        advSettings.classList.toggle('open');
        const arrow = advToggleBtn.querySelector('.adv-arrow');
        if (arrow) arrow.textContent = advSettings.classList.contains('open') ? '∧' : '∨';
      });
    }

    // Prev/Next section navigation
    const prevSectionBtn = document.getElementById('prevSection');
    const nextSectionBtn = document.getElementById('nextSection');

    if (prevSectionBtn) {
      prevSectionBtn.addEventListener('click', () => {
        if (editCurrentSection > 0) {
          saveSectionData(editCurrentSection);
          editCurrentSection--;
          loadSectionData(editCurrentSection);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
    if (nextSectionBtn) {
      nextSectionBtn.addEventListener('click', () => {
        if (editCurrentSection < sectionsData.length - 1) {
          saveSectionData(editCurrentSection);
          editCurrentSection++;
          loadSectionData(editCurrentSection);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // Final generate -> credit modal
    const finalGenBtn = document.getElementById('finalGenerateBtn');
    const creditModal = document.getElementById('creditModal');
    let previousFocus = null;

    function openModal() {
      if (!creditModal) return;
      previousFocus = document.activeElement;
      creditModal.style.display = 'flex';
      creditModal.setAttribute('role', 'dialog');
      creditModal.setAttribute('aria-modal', 'true');
      const firstBtn = creditModal.querySelector('button');
      if (firstBtn) firstBtn.focus();
    }

    function closeModal() {
      if (!creditModal) return;
      creditModal.style.display = 'none';
      if (previousFocus) previousFocus.focus();
    }

    if (finalGenBtn && creditModal) {
      finalGenBtn.addEventListener('click', openModal);
    }

    // Modal cancel
    const modalCancelBtn = document.querySelector('.modal-cancel-btn');
    if (modalCancelBtn) {
      modalCancelBtn.addEventListener('click', closeModal);
    }

    // Modal confirm -> generating
    const modalConfirmBtn = document.querySelector('.modal-confirm-btn');
    if (modalConfirmBtn) {
      modalConfirmBtn.addEventListener('click', () => {
        window.location.href = 'generating.html';
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && creditModal && creditModal.style.display === 'flex') {
        closeModal();
      }
    });

    // Ctrl+S save shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveSectionData(editCurrentSection);
        const badge = document.querySelector('.autosave-badge');
        if (badge) {
          badge.textContent = '✓ 저장 완료!';
          setTimeout(() => { badge.textContent = '✓ 자동 저장 활성화됨'; }, 2000);
        }
      }
    });

  } // end edit-plan guard

});
