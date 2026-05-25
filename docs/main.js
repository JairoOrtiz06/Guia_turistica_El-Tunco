document.addEventListener("DOMContentLoaded", () => {
    
    const sidebar = document.querySelector(".sidebar-main");
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-btn");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebar && sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            sidebar.classList.toggle("is-open");
            sidebarToggleBtn.classList.toggle("is-open");
            //if (sidebarOverlay) sidebarOverlay.classList.toggle("is-active");
        });

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener("click", () => {
                sidebar.classList.remove("is-open");
                sidebarToggleBtn.classList.remove("is-open");
                //sidebarOverlay.classList.remove("is-active");
            });
        }
    }

    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("is-active");
        });
    }

    const esPaginaInspiraciones = document.getElementById('vista-menu');
    if (esPaginaInspiraciones) {
        const CARDS = ['vista-card-1', 'vista-card-2', 'vista-card-3', 'vista-card-4', 'vista-card-5', 'vista-card-6'];
        const ID_MENU = 'vista-menu';
        const TODAS_LAS_VISTAS = [ID_MENU].concat(CARDS);
        let indiceActual = -1;

        const navLiIniciar = document.getElementById('nav-li-iniciar');
        const navLiAtras = document.getElementById('nav-li-atras');
        const navLiAdelante = document.getElementById('nav-li-adelante');

        const actualizarNavbar = () => {
            const enMenu = indiceActual === -1;
            if (navLiIniciar) navLiIniciar.classList.toggle('d-none', !enMenu);
            if (navLiAtras) navLiAtras.classList.toggle('d-none', enMenu);
            if (navLiAdelante) navLiAdelante.classList.toggle('d-none', enMenu);
        };

        const mostrarVista = (idVista) => {
            TODAS_LAS_VISTAS.forEach(id => {
                const seccion = document.getElementById(id);
                if (seccion) {
                    seccion.classList.remove('activa');
                    seccion.classList.add('d-none');
                }
            });
            const destino = document.getElementById(idVista);
            if (destino) {
                destino.classList.remove('d-none');
                setTimeout(() => destino.classList.add('activa'), 50);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const irAlMenu = () => { indiceActual = -1; mostrarVista(ID_MENU); actualizarNavbar(); };
        const irACard = (indice) => { indiceActual = indice; mostrarVista(CARDS[indice]); actualizarNavbar(); };

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-accion]');
            if (!btn) return;
            
            const accion = btn.dataset.accion;
            if (accion === 'iniciar') irACard(0);
            else if (accion === 'ir-card') irACard(parseInt(btn.dataset.indice));
            else if (accion === 'atras') indiceActual <= 0 ? irAlMenu() : irACard(indiceActual - 1);
            else if (accion === 'adelante') indiceActual >= CARDS.length - 1 ? irAlMenu() : irACard(indiceActual + 1);
            
            if (['iniciar', 'ir-card', 'atras', 'adelante'].includes(accion)) {
                e.preventDefault();
            }
        });
        actualizarNavbar();
    }

    const imagenPrincipal = document.querySelector(".imagen-principal");
    const miniaturas = document.querySelectorAll(".miniaturas img");

    if (imagenPrincipal && miniaturas.length > 0) {
        miniaturas.forEach((img) => {
            img.addEventListener("click", () => {
                imagenPrincipal.src = img.src;
            });
        });
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("is-open");
        document.body.style.overflow = "auto";
    }

    const openButtons = document.querySelectorAll("[data-modal-target]");
    const closeButtons = document.querySelectorAll("[data-modal-close]");
    const modals = document.querySelectorAll(".modal, .modal-alert, .modal-form");

    openButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = document.getElementById(btn.getAttribute("data-modal-target"));
            if (modal) {
                modal.classList.add("is-open");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(btn.closest(".modal, .modal-alert, .modal-form"));
        });
    });

    const form = document.getElementById("formRegistro");
    const btnGuardar = document.getElementById("btnGuardar");

    if (form && btnGuardar) {
        btnGuardar.addEventListener("click", (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                closeModal(document.getElementById("modalForm"));
                form.reset();
            } else {
                form.reportValidity();
            }
        });
    }

    // Cerrar alertas
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("alerta-close")) {
            const alerta = e.target.closest(".alerta, .alerta-pildora");
            if (alerta) alerta.remove();
        }
    });
});
