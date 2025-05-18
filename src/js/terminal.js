/* صفحة الدردشة */
.chat-page {
    padding-top: var(--spacing-md);
}

.page-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.header-logo {
    margin-bottom: var(--spacing-md);
}

.cosmic-logo {
    width: 80px;
    height: 80px;
    animation: pulse 3s infinite;
}

.page-title {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-sm);
    color: var(--primary);
}

.page-description {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
}

/* حاوية الدردشة */
.chat-container {
    display: flex;
    gap: var(--spacing-lg);
    max-width: 1400px;
    margin: 0 auto;
    height: calc(100vh - 300px);
    min-height: 500px;
}

/* الشريط الجانبي للمحادثات */
.conversations-sidebar {
    width: 300px;
    background-color: var(--bg-lighter);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.sidebar-header {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--bg-dark);
}

.w-full {
    width: 100%;
}

.conversations-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-sm);
}

.conversation-item {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-xs);
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.conversation-item:hover {
    background-color: var(--bg-dark);
}

.conversation-item.active {
    background-color: var(--bg-dark);
    border-right: 3px solid var(--primary);
}

.conversation-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xs);
}

.conversation-title span {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.delete-conversation-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.9rem;
    padding: var(--spacing-xs);
    opacity: 0;
    transition: opacity var(--transition-fast), color var(--transition-fast);
}

.conversation-item:hover .delete-conversation-btn {
    opacity: 1;
}

.delete-conversation-btn:hover {
    color: var(--primary);
}

.conversation-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 0.8rem;
    color: var(--text-muted);
}

.model-badge {
    background-color: var(--bg-dark);
    padding: 2px var(--spacing-xs);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

/* المحتوى الرئيسي للدردشة */
.chat-main {
    flex: 1;
    background-color: var(--bg-lighter);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background-color: var(--bg-dark);
    border-bottom: 1px solid var(--bg-lighter);
}

.chat-tabs {
    display: flex;
    gap: var(--spacing-xs);
}

.chat-tab {
    background: none;
    border: none;
    color: var(--text-muted);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transition: background-color var(--transition-fast), color var(--transition-fast);
}

.chat-tab:hover {
    background-color: var(--bg-lighter);
    color: var(--text-light);
}

.chat-tab.active {
    background-color: var(--bg-lighter);
    color: var(--primary);
}

.chat-header-actions {
    display: flex;
    gap: var(--spacing-xs);
}

.chat-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-tab-content {
    display: none;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
}

.chat-tab-content.active {
    display: flex;
}

.chat-messages {
    flex: 1;
    padding: var(--spacing-md);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.empty-chat-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: var(--spacing-xl);
}

.empty-chat-img {
    width: 200px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.8;
}

.empty-chat-placeholder h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-light);
}

.empty-chat-placeholder p {
    color: var(--text-muted);
    max-width: 400px;
}

.message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
}

.message.user {
    align-self: flex-end;
}

.message.system {
    align-self: flex-start;
}

.message-content {
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    background-color: var(--bg-dark);
}

.message.user .message-content {
    background-color: var(--primary-dark);
}

.typing-indicator {
    display: flex;
    gap: 4px;
}

.typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: var(--text-muted);
    border-radius: var(--radius-full);
    display: inline-block;
    animation: typing 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
    animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

.chat-input-container {
    padding: var(--spacing-md);
    background-color: var(--bg-dark);
    border-top: 1px solid var(--bg-lighter);
    display: flex;
    gap: var(--spacing-md);
}

.chat-input-box {
    flex: 1;
    position: relative;
}

.chat-input-box textarea {
    width: 100%;
    padding: var(--spacing-md);
    padding-left: 40px;
    border-radius: var(--radius-md);
    background-color: var(--bg-lighter);
    border: 1px solid transparent;
    color: var(--text-light);
    resize: none;
    height: 60px;
    transition: border-color var(--transition-fast);
}

.chat-input-box textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.settings-toggle {
    position: absolute;
    left: var(--spacing-sm);
    top: 50%;
    transform: translateY(-50%);
}

.send-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-fast), transform var(--transition-fast);
    align-self: flex-end;
}

.send-btn:hover {
    background-color: var(--primary-dark);
    transform: scale(1.05);
}

.send-btn:disabled {
    background-color: var(--bg-lighter);
    color: var(--text-muted);
    cursor: not-allowed;
    transform: none;
}

.quick-settings {
    background-color: var(--bg-dark);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-top: var(--spacing-sm);
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.settings-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.settings-item label {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.settings-item select,
.settings-item input[type="text"] {
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background-color: var(--bg-lighter);
    border: 1px solid var(--bg-lighter);
    color: var(--text-light);
}

.settings-item select:focus,
.settings-item input[type="text"]:focus {
    outline: none;
    border-color: var(--primary);
}

.slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-lighter);
    transition: var(--transition-fast);
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: var(--text-muted);
    transition: var(--transition-fast);
}

input:checked + .slider {
    background-color: var(--primary);
}

input:checked + .slider:before {
    transform: translateX(20px);
    background-color: white;
}

.slider.round {
    border-radius: 20px;
}

.slider.round:before {
    border-radius: 50%;
}

.system-prompt-container {
    margin-top: var(--spacing-md);
}

.system-prompt-container textarea {
    width: 100%;
    height: 80px;
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background-color: var(--bg-lighter);
    border: 1px solid var(--bg-lighter);
    color: var(--text-light);
    resize: none;
}

.system-prompt-container textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.settings-help-text {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: var(--spacing-xs);
}

/* إعدادات */
.settings-section {
    background-color: var(--bg-dark);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.settings-section h3 {
    margin-bottom: var(--spacing-md);
    color: var(--primary);
    font-size: 1.2rem;
}

.api-key-status {
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background-color: var(--bg-lighter);
    color: var(--text-muted);
    font-size: 0.9rem;
}

/* الاستجابة */
@media (max-width: 992px) {
    .chat-container {
        flex-direction: column;
        height: auto;
    }
    
    .conversations-sidebar {
        width: 100%;
        height: 300px;
    }
    
    .chat-main {
        height: 600px;
    }
}

@media (max-width: 768px) {
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .chat-header {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    
    .chat-tabs {
        width: 100%;
    }
    
    .chat-tab {
        flex: 1;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .message {
        max-width: 90%;
    }
    
    .chat-input-container {
        flex-direction: column;
    }
    
    .send-btn {
        align-self: flex-end;
    }
}
