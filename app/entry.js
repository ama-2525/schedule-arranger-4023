'use strict';
import $ from 'jquery';
globalThis.jQuery = $;

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

$('.availability-toggle-button').each((i, e) => {
  const button = $(e);
  button.on('click', () => {
    const scheduleId = button.data('schedule-id');
    const userId = button.data('user-id');
    const candidateId = button.data('candidate-id');
    const availability = parseInt(button.data('availability'));
    const nextAvailability = (availability + 1) % 3;
    $.post(`/schedules/${scheduleId}/users/${userId}/candidates/${candidateId}`,
      { availability: nextAvailability },
      (data) => {
        button.data('availability', data.availability);
        const availabilityLabels = ['欠', '？', '出'];
        button.text(availabilityLabels[data.availability]);

        const buttonStyles = ['btn-danger', 'btn-secondary', 'btn-success'];
        button.removeClass('btn-danger btn-secondary btn-success');
        button.addClass(buttonStyles[data.availability]);
      });
  });
});

const buttonSelfComment = $('#self-comment-button');
buttonSelfComment.on('click', () => {
  const scheduleId = buttonSelfComment.data('schedule-id');
  const userId = buttonSelfComment.data('user-id');
  const comment = prompt('コメントを255文字以内で入力してください。');
  if (comment) {
    $.post(`/schedules/${scheduleId}/users/${userId}/comments`,
      { comment: comment },
      (data) => {
        $('#self-comment').text(data.comment);
      });
  }
});

const shareUrl = window.location.href;
const shareUrlInput = $('#share-url');
const shareUrlCopyButton = $('#copy-button');

shareUrlInput.val(shareUrl);

shareUrlInput.val(shareUrl);

shareUrlCopyButton.on('click', () => {
  navigator.clipboard.writeText(shareUrl).then(() => {
    shareUrlCopyButton.text('Copied!');
    setTimeout(() => shareUrlCopyButton.text('Copy'), 1000);
  })
})