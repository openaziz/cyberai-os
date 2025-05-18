/* =========== Chat Page Styles =========== */
.chat-page {
    padding: var(--spacing-8) var(--spacing-4);
}

.page-header {
    text-align: center;
    margin-bottom: var(--spacing-8);
}

.header-logo {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-4);
}

.cosmic-logo {
    width: 64px;
    height: 64px;
}

.page-title {
    margin-bottom: var(--spacing-2);
}

.page-description {
    max-width: 600px;
    margin: 0 auto;
    color: var(--color-foreground-muted);
}

.chat-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--spacing-6);
    max-width: 1400px;
    margin: 0 auto;
}

/* Conversations Sidebar */
.conversations-sidebar {
    background-color: var(--color-background-lighter);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 700px;
}

.sidebar-header {
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--color-border);
}

.w-full {
    width: 100%;
}

.conversations-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-2);
}

.conversation-item {
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-2);
    cursor: pointer;
    transition: background-color var(--transition-normal);
}

.conversation-item:hover {
    background-color: var(--color-background-darker);
}

.conversation-item.active {
    background-color: var(--color-primary-light);
    border: 1px solid rgba(99, 102, 241, 0.2);
}

.conversation-title {
    font-weight: 600;
    margin-bottom: var(--spacing-1);
    display: flex;
    justify-content: space-between;
}

.conversation-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-xs);
    color: var(--color-foreground-muted);
}

/* Chat Main */
.chat-main {
    background-color: var(--color-background-lighter);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    height: 700px;
    overflow: hidden;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-3) var(--spacing-4);
    border-bottom: 1px solid var(--color-border);
}

.chat-tabs {
    display: flex;
    gap: var(--spacing-2);
}

.chat-tab {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: background-color var(--transition-normal), color var(--transition-normal);
}

.chat-tab:hover {
    background-color: var(--color-background-darker);
}

.chat-tab.active {
    background-color: var(--color-primary);
    color: white;
}

.chat-header-actions {
    display: flex;
    gap: var(--spacing-2);
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
    overflow-y: auto;
    padding: var(--spacing-4);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

.empty-chat-placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-8);
    text-align: center;
}

.empty-chat-img {
    width: 200px;
    margin-bottom: var(--spacing-6);
}

.empty-chat-placeholder h3 {
    margin-bottom: var(--spacing-2);
}

.empty-chat-placeholder p {
    max-width: 400px;
    color: var(--color-foreground-muted);
}

.message-container {
    display: flex;
    width: 100%;
}

.message-container.user {
    justify-content: flex-end;
}

.message {
    max-width: 80%;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.message.user {
    background-color: var(--color-primary-light);
}

.message.assistant {
    background-color: var(--color-background);
}

.message-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-4);
    border-bottom: 1px solid var(--color-border);
    font-size: var(--font-size-sm);
}

.avatar-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
}

.message-content {
    padding: var(--spacing-4);
    white-space: pre-wrap;
}

.chat-input-container {
    padding: var(--spacing-4);
    border-top: 1px solid var(--color-border);
}

.chat-input-box {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    position: relative;
}

#chat-input {
    width: 100%;
    min-height: 80px;
    max-height: 200px;
    resize: none;
    border: none;
    background: transparent;
    padding-right: var(--spacing-8);
}

#chat-input:focus {
    outline: none;
}

.settings-toggle {
    position: absolute;
    bottom: var(--spacing-2);
    right: var(--spacing-2);
}

.send-btn {
    background-color: var(--color-primary);
    color: white;
    width: 100%;
    height: 40px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-normal);
}

.send-btn:disabled {
    background-color: var(--color-background-darker);
    color: var(--color-foreground-muted);
    cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
    background-color: var(--color-primary-hover);
}

/* Quick Settings */
.quick-settings {
    background-color: var(--color-background-darker);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    margin-top: var(--spacing-4);
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
}

.settings-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
}

.settings-item label {
    font-weight: 600;
    font-size: var(--font-size-sm);
}

.settings-item select,
.settings-item input[type="text"] {
    padding: var(--spacing-2) var(--spacing-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-background);
}

.slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-xs);
    color: var(--color-foreground-muted);
    margin-top: var(--spacing-1);
}

.toggle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
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
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: var(--color-foreground-muted);
    transition: 0.4s;
}

input:checked + .slider {
    background-color: var(--color-primary-light);
}

input:checked + .slider:before {
    transform: translateX(24px);
    background-color: var(--color-primary);
}

.slider.round {
    border-radius: 24px;
}

.slider.round:before {
    border-radius: 50%;
}

.system-prompt-container {
    margin-top: var(--spacing-4);
}

.system-prompt-container textarea {
    width: 100%;
    min-height: 80px;
    padding: var(--spacing-2) var(--spacing-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-background);
    resize: vertical;
    margin: var(--spacing-2) 0;
}

.settings-help-text {
    font-size: var(--font-size-xs);
    color: var(--color-foreground-muted);
}

/* Settings Tab Content */
.settings-section {
    background-color: var(--color-background);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-4);
}

.settings-section h3 {
    margin-bottom: var(--spacing-4);
    font-size: var(--font-size-lg);
}

.api-key-status {
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    background-color: var(--color-background-darker);
    font-size: var(--font-size-sm);
    color: var(--color-foreground-muted);
}

#settings-tab-content {
    padding: var(--spacing-4);
    overflow-y: auto;
}

/* Responsive Styles */
@media (max-width: 992px) {
    .chat-container {
        grid-template-columns: 1fr;
    }
    
    .conversations-sidebar {
        height: auto;
        max-height: 400px;
    }
}

@media (max-width: 768px) {
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .chat-header {
        flex-direction: column;
        gap: var(--spacing-3);
        align-items: stretch;
    }
    
    .chat-tabs {
        justify-content: center;
    }
    
    .chat-header-actions {
        justify-content: center;
    }
}
