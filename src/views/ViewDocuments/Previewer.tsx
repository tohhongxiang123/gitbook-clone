import React from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import client from '../../api/client'
import { usePromise } from '../../api/usePromise'

export default function Previewer() {
    const params = useParams<{ documentID: string }>()
    const documentID = params.documentID
    const match = useRouteMatch()
    console.log(match)
    const [{ isLoading, error, data: chapter }] = usePromise((documentID: string) => client.getChapter(documentID), null, documentID)


    return isLoading ? <p>Loading...</p> : (
        <>
            {error && <p>{error}</p>}
            {chapter && <div className="previewer">
                <h1>HTML Ipsum Presents {chapter.title}</h1>

                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="www.google.com">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

                <h2>Header Level 2</h2>

                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                </ol>

                <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

                <h3>Header Level 3</h3>

                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                </ul>

                <pre><code>
                    {`#header h1 a {
                    display: block;
                    width: 300px;
                    height: 80px;
                }`}
                </code></pre>

                <h4>Heading 4</h4>
                <table>
                    <thead>
                        <tr>
                            <th>asdf</th>
                            <th>cxvcv</th>
                            <th>aef</th>
                            <th>adv</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>adsf</td>
                            <td>zxcv</td>
                            <td>zxcv</td>
                            <td>zxcv</td>
                        </tr>
                        <tr>
                            <td>cvxbfdga</td>
                            <td>qwreqr</td>
                            <td>svxb</td>
                            <td>weqr</td>
                        </tr>
                        <tr>
                            <td>asdf</td>
                            <td>d</td>
                            <td></td>
                            <td>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</td>
                        </tr>
                    </tbody>
                </table>

                <form action="#" method="post">
                    <div>
                        <label htmlFor="name">Text Input:</label>
                        <input type="text" name="name" id="name" placeholder="Placeholder" />
                    </div>

                    <div>
                        <h4>Radio Button Choice</h4>

                        <label htmlFor="radio-choice-1">Choice 1</label>
                        <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1" />

                        <label htmlFor="radio-choice-2">Choice 2</label>
                        <input type="radio" name="radio-choice-2" id="radio-choice-2" value="choice-2" />
                    </div>

                    <div>
                        <label htmlFor="select-choice">Select Dropdown Choice:</label>
                        <select name="select-choice" id="select-choice">
                            <option value="Choice 1">Choice 1</option>
                            <option value="Choice 2">Choice 2</option>
                            <option value="Choice 3">Choice 3</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="textarea">Textarea:</label>
                        <textarea name="textarea" id="textarea"></textarea>
                    </div>

                    <div>
                        <label htmlFor="checkbox">Checkbox:</label>
                        <input type="checkbox" name="checkbox" id="checkbox" />
                    </div>

                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>

                <button>This is a button</button>
                <button disabled>This is a disabled button</button>
                <button className="button-primary">This is a primary button</button>
                <button className="button-secondary">This is a secondary button</button>
                <button className="button-success">This is a success button</button>
                <button className="button-danger">This is a danger button</button>
                <button disabled className="button-primary">This is a primary button disabled</button>
                <button disabled className="button-secondary">This is a secondary button disabled</button>
                <button disabled className="button-success">This is a success button disabled</button>
                <button disabled className="button-danger">This is a danger button disabled</button>
            </div>}
        </>
    )
}
