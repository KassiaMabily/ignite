import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt="Capa"
        className={styles.cover}
      />
      <div className={styles.profile}>

        <Avatar src={"https://github.com/KassiaMabily.png"} />

        <strong>Kassia Fraga</strong>
        <span>Head TI</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine
            size={20}
          />
          <span>Editar o seu perfil</span>
        </a>
      </footer>
    </aside>
  )
}
