import React from 'react';

export default function EmojiWindow(props) {

    // const emojis = ['😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😌', '😍', '😏', '😒', '😓', '😔', '😖', '😘', '😚', '😜', '😝', '😞', '😠', '😡', '😢', '😣', '😤', '😥', '😨', '😩', '😪', '😫', '😭', '😰', '😱', '😲', '😳', '😵', '😷'];

    const emojis = ['😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😌', '😍', '😏', '😒', '😓', '😔', '😖', '😘', '😚', '😜', '😝', '😞', '😠', '😡', '😢', '😣', '😤', '😥', '😨', '😩'];

    let emojiWindow = emojis.map((emoji, emojisIndex) => (
        <span onClick={() => props.handleEmojiClick(emoji)} key={emojisIndex} style={{margin: 2, fontSize: 25, cursor: 'pointer'}}>{emoji}</span>
    ));

    return emojiWindow;
}