import "@/componentes/Header/Header.css";

export default async function Header(){

  
    return(
        <header className='header'>
                <nav>
                    <ul>
                        <li><a href="https://www.youtube.com/shorts/_6HzLIJPH2A" target='_blank'>Sobre</a></li>| 
                        <li><a href="https://www.youtube.com/watch?v=pkACVyU4PmA&list=RDpkACVyU4PmA&start_radio=1" target='_blank'>Página Oficial</a></li>
                    </ul>
                </nav>
                <div>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=99TjczXQB-g&list=RD99TjczXQB-g&start_radio=1" target='_blank'>Login</a></li> 
                    </ul>
                </div>
        </header>
    )
}