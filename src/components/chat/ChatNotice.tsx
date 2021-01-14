import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { ChannelMetaType } from 'node-kakao';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoManager from '../../KakaoManager';
import { ReducerType } from '../../reducers';

const NoticeAccordion = styled(Accordion)`
  position: absolute;
  z-index: 2;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.5) 0 3px 6px;
`;

const NoticeAccordionSummary = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
  
    width: calc(100% - 36px);
  }
`;

const NoticeTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChatNotice = (): JSX.Element | null => {
  const { select } = useSelector((state: ReducerType) => state.chat);

  const noticeContent = KakaoManager
      .getChannel(select)
      .getChannelMeta(ChannelMetaType.NOTICE)
      ?.content;

  const [noticeSummary, setNoticeSummary] = useState('공지 ' + noticeContent);

  const expandNotice = (isExpanded: boolean) => {
    if (isExpanded) setNoticeSummary('공지');
    else setNoticeSummary('공지 ' + noticeContent);
  };

  if (noticeContent) {
    return (
      <NoticeAccordion onChange={(event, expanded) => {
        expandNotice(expanded);
      }}>
        <NoticeAccordionSummary expandIcon={<ExpandMore />}>
          <NoticeTypography>{noticeSummary}</NoticeTypography>
        </NoticeAccordionSummary>
        <AccordionDetails>
          <Typography>{noticeContent}</Typography>
        </AccordionDetails>
      </NoticeAccordion>
    );
  } else {
    return null;
  }
};

export default ChatNotice;
