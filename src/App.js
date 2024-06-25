import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState(`
    <html>
      <body>
        <p style="text-align:center; color: gray;">Please enter HTML, CSS, or JS to see the output.</p>
      </body>
    </html>`);

  
    useEffect(() => {
      if (html.trim() === '' && css.trim() === '' && js.trim() === '') {
        setSrcDoc(`
          <html>
            <body>
              <p style="font-size:20px; color: gray;">Please enter HTML, CSS, or JS to see the output.</p>
            </body>
          </html>
        `);
      } else {
        const timeout = setTimeout(() => {
          setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `);
        }, 250);
  
        return () => clearTimeout(timeout);
      }
    }, [html, css, js]);
  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;