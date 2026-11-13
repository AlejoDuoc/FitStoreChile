package com.fitstore.backend.config;

import com.fitstore.backend.model.Producto;
import com.fitstore.backend.model.Usuario;
import com.fitstore.backend.repository.ProductoRepository;
import com.fitstore.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UsuarioRepository usuarioRepository,
                                      ProductoRepository productoRepository,
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            if (!usuarioRepository.existsByEmail("admin@fitstore.cl")) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador FitStore");
                admin.setEmail("admin@fitstore.cl");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEdad(30);
                admin.setRol("ROLE_ADMIN");
                admin.setTieneDescuento(true);
                usuarioRepository.save(admin);
            }

            if (productoRepository.count() == 0) {
                List<Producto> productos = List.of(
                    new Producto(null, "Polera Oversize Gym", "Ropa Deportiva", 15990, 14,
                        "Algodón peinado de alto gramaje con caída drop-shoulder para máxima comodidad.", "/imagenes/polera-oversize-gym.jpg"),
                    new Producto(null, "Calza Compresión Pro", "Ropa Deportiva", 20990, 8,
                        "Tejido técnico bielástico que mejora el retorno venoso y soporte muscular.", "/imagenes/calza-compresion-pro.jpg"),
                    new Producto(null, "Short Running DryFit", "Ropa Deportiva", 17990, 12,
                        "Secado ultrarrápido con forro interno antirozaduras y bolsillo seguro.", "/imagenes/short-running-dryfit.jpg"),
                    new Producto(null, "Hooded Sweatshirt Heavy", "Ropa Deportiva", 18990, 6,
                        "Polerón térmico con interior polar cepillado para entrenamientos invernales.", "/imagenes/hooded-sweatshirt-heavy.jpg"),
                    new Producto(null, "Crop Top Ergonomico", "Ropa Deportiva", 15990, 10,
                        "Diseño anatomico con compresion zonificada para cero friccion.", "/imagenes/crop-top-seamless.jpg"),
                    new Producto(null, "Short Cargo Entreno", "Ropa Deportiva", 15990, 9,
                        "Bolsillos funcionales reforzados y pretina ajustable de alta resistencia.", "/imagenes/short-cargo-entreno.jpg"),
                    new Producto(null, "Tank Top Muscle", "Ropa Deportiva", 21990, 11,
                        "Sisa amplia y caída atlética diseñada para libertad total de movimiento.", "/imagenes/tank-top-muscle.jpg"),
                    new Producto(null, "Polera Manga Larga Thermal", "Ropa Deportiva", 28990, 7,
                        "Regulación térmica avanzada para sesiones en exteriores y climas fríos.", "/imagenes/polera-manga-larga-thermal.jpg"),
                    new Producto(null, "Joggers Fit Slim", "Ropa Deportiva", 34990, 5,
                        "Corte ahusado con puños elásticos y bolsillos con cremalleras ocultas.", "/imagenes/joggers-fit-slim.jpg"),
                    new Producto(null, "Top Deportivo High Support", "Ropa Deportiva", 28990, 13,
                        "Soporte de alto impacto con tirantes ergonómicos y copas transpirables.", "/imagenes/top-deportivo-high-support.jpg"),

                    new Producto(null, "Proteína Whey Isolate 2kg", "Suplementos", 16990, 15,
                        "Aislado de suero 90% proteína pura por servicio, cero azúcares añadidos.", "/imagenes/proteina-whey-isolate.jpg"),
                    new Producto(null, "Creatina Monohidratada 300g", "Suplementos", 16990, 22,
                        "Creatina micronizada 200 mesh para solubilidad perfecta y fuerza explosiva.", "/imagenes/creatina-monohidratada.jpg"),
                    new Producto(null, "Pre-Workout Explosion 300g", "Suplementos", 18990, 14,
                        "Complejo de beta-alanina, cafeína anhidra y citrulina malato para foco total.", "/imagenes/pre-workout-explosion.jpg"),
                    new Producto(null, "BCAA 2:1:1 400g", "Suplementos", 48990, 8,
                        "Aminoácidos ramificados para acelerar la recuperación y síntesis proteica.", "/imagenes/bcaa.jpg"),
                    new Producto(null, "Multivitamínico Sport 90 caps", "Suplementos", 33990, 16,
                        "Fórmula de micronutrientes optimizada para el desgaste físico de atletas.", "/imagenes/multivitaminico-sport.jpg"),
                    new Producto(null, "Omega 3 Ultra Pure 120 caps", "Suplementos", 39990, 12,
                        "Ácidos grasos EPA/DHA de alta concentración destilados molecularmente.", "/imagenes/omega-3.jpg"),
                    new Producto(null, "Mass Gainer 3kg", "Suplementos", 22990, 6,
                        "Matriz balanceada de carbohidratos complejos y proteínas para fase de volumen.", "/imagenes/mass-gainer.jpg"),
                    new Producto(null, "Glutamina Micronizada 500g", "Suplementos", 33990, 9,
                        "L-glutamina pura para protección muscular y refuerzo del sistema inmune.", "/imagenes/glutamina.jpg"),
                    new Producto(null, "Proteína Vegana 1kg", "Suplementos", 46990, 10,
                        "Fórmula a base de aislado de arveja y arroz con perfil de aminoácidos completo.", "/imagenes/proteina-vegana.jpg"),
                    new Producto(null, "Electrolitos Hydrate 300g", "Suplementos", 46990, 18,
                        "Sodio, magnesio y potasio en proporciones fisiológicas para rehidratación.", "/imagenes/electrolitos.jpg"),

                    new Producto(null, "Cinturón Levantamiento Cuero", "Accesorios", 10990, 7,
                        "Cuero genuino 10mm de espesor con hebilla de acero inoxidable de palanca.", "/imagenes/cinturon-levantamiento.jpg"),
                    new Producto(null, "Straps de Algodón Heavy", "Accesorios", 15990, 25,
                        "Cintas reforzadas con acolchado de neopreno en muñeca para agarre inquebrantable.", "/imagenes/straps-algodon.jpg"),
                    new Producto(null, "Botella Shaker 1 Litro", "Accesorios", 24990, 20,
                        "Libre de BPA con mezclador de rejilla y cierre hermético a prueba de fugas.", "/imagenes/botella-shaker.jpg"),
                    new Producto(null, "Muñequeras Neopreno Pro", "Accesorios", 18990, 14,
                        "Soporte de compresión articular para press banca y levantamientos olímpicos.", "/imagenes/munequeras.jpg"),
                    new Producto(null, "Cuerda de Salto Alta Velocidad", "Accesorios", 17990, 15,
                        "Cable de acero con rodamientos dobles 360° para saltos dobles fluidos.", "/imagenes/cuerda-salto.jpg"),
                    new Producto(null, "Bandas de Resistencia (Set 5)", "Accesorios", 21990, 13,
                        "Látex natural de cinco resistencias graduadas para calentamiento y fuerza.", "/imagenes/bandas-resistencia.jpg"),
                    new Producto(null, "Guantes Gimnasio Grip", "Accesorios", 22990, 11,
                        "Palma antideslizante con ventilación transpirable para protección de callos.", "/imagenes/guantes-gimnasio.jpg"),
                    new Producto(null, "Mochila Deportiva Waterproof", "Accesorios", 19990, 5,
                        "Compartimento estanco para calzado húmedo y múltiples bolsillos tácticos.", "/imagenes/mochila-deportiva.jpg"),
                    new Producto(null, "Rodilleras 7mm Neopreno", "Accesorios", 20990, 8,
                        "Grosor reglamentario para sentadillas profundas y calor articular constante.", "/imagenes/rodilleras.jpg"),
                    new Producto(null, "Magnesio Líquido 250ml", "Accesorios", 13990, 30,
                        "Fórmula de secado en 10 segundos, cero polvo residual y máxima adherencia.", "/imagenes/magnesio-liquido.jpg")
                );

                productoRepository.saveAll(productos);
            }
        };
    }
}
