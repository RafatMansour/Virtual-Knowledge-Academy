'use client';

import React from 'react';
import styled from 'styled-components';

const Card: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="card hover:shadow-xl transition-shadow duration-300">
        <div className="mac-header">
          <span className="red" />
          <span className="yellow" />
          <span className="green" />
        </div>
        <div className="code-editor">
          <pre>
            <code>&lt;h1&gt; Hadi Nabulsi &lt;/h1&gt;</code>
          </pre>
          <pre>
            <code>&lt;h2&gt; The King Of Front-End &lt;/h2&gt;</code>
          </pre>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  .card {
    width: 645.34px;
    height: 384px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 16px 0 rgba(56, 42, 85, 0.07);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s, color 0.3s;
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #382a55;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background-color: #443266;
      border-color: #382a55;
      color: #fff;
      box-shadow: 0 4px 16px 0 rgba(68, 50, 102, 0.13);
    }
  }

  .mac-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
  }

  .mac-header span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
  }

  .mac-header .red {
    background-color: #ff5f57;
  }
  .mac-header .yellow {
    background-color: #ffbd2e;
  }
  .mac-header .green {
    background-color: #28c941;
  }

  @media (prefers-color-scheme: dark) {
    .mac-header span {
      border: 1px solid #382a55;
    }
  }

  .code-editor {
    background-color: #f4f1fa;
    color: #382a55;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 5px;
    padding: 15px;
    overflow: auto;
    height: 315.4px;
    border: 1px solid #e0e0e0;
  }

  @media (prefers-color-scheme: dark) {
    .code-editor {
      background-color: #382a55;
      color: #fff;
      border-color: #aa7fff;
    }
  }

  .code-editor::-webkit-scrollbar {
    width: 8px;
  }

  .code-editor::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  .code-editor pre code {
    white-space: pre-wrap;
    display: block;
  }

  @media (max-width: 768px) {
    .card {
      width: 600px;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
    }

    .code-editor {
      height: auto;
      min-height: 250px;
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 352px;
      max-width: 100%;
      padding: 15px;
      margin: 0 auto;
    }

    .code-editor {
      font-size: 13px;
      padding: 12px;
      min-height: 200px;
    }
  }
`;

export default Card;
