import React  from 'react';

function CopyrightMenu({menus, languages}) {
    return (
        <>
            <div className="copyright-right-side justify-content-end d-flex align-items-center">
                <ul className="list-items">
                    {menus.map((link, index) => {
                        return (
                            <li key={index}>
                                <a href={link.path}>{link.title}</a>
                            </li>
                        )
                    })}
                </ul>
                <div className="select-field">
                    <select name="language" id="language-switch">
                        {languages.map((language, index2) => {
                            return (
                                <option value={index2} key={index2}>{language}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}

export default CopyrightMenu;
