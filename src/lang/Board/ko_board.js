const KO_BOARD = {
  // TODO: 데이터X 댓글이면 댓글 포스트면 포스트 명시적으로 정의할 것!
  boardCreateErr: '데이터 업로드하지 못했습니다',
  boardUpdateErr: '데이터를 수정하지 못했습니다 ',
  boardReadErr: '데이터를 불러오지 못했습니다',
  boardDeleteErr: '데이터를 삭제하지 못했습니다',

  boardCreateSucc: '데이터 업로드했습니다',
  boardUpdateSucc: '데이터를 수정했습니다',
  boardReadSucc: '데이터를 불러왔습니다',
  boardDeleteSucc: '데이터를 삭제했습니다',

  boardRequiredLogin:
    '로그인이 필요한 서비스입니다! 로그인 페이지로 이동하시겠습니까?',
  // Upload Validation
  boardImgRequiredErr: '이미지를 선택해주세요.',
  boardContentRequiredErr: '게시글 내용을 작성해주세요.',
  boardContentMaxErr: '최대 255자까지 작성할 수 있습니다',
  boardDeleteNor: '삭제하시겠습니까?',
  boardUpdateNone: '수정된 내용이 없습니다!',

  boardBeModified: '(수정됨)',
  boardPlaceHolder: '텍스트 입력...',

  boardCommunityTitle: '커뮤니티',
  boardUploadButton: '게시물 작성',
};

export default KO_BOARD;
