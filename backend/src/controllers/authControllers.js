import db from '../../bd/config.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_jwt_muy_segura';

export const loginUser = async (req, res) => {
    const { mail, pass } = req.body;

    if (!mail || !pass) {
        return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }

    try {
        const result = await db.query('SELECT id, mail, pass, rol FROM usuario WHERE mail = $1', [mail]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        if (pass !== user.pass) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        const token = jwt.sign(
            { userId: user.id, mail: user.mail, rol: user.rol },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "Login exitoso", token });

    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};