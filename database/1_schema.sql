--
-- PostgreSQL database dump
--

\restrict EPx2bRrFyplBvxeLZfdQz4yIKu4ivCg1Xea9TEwePgU19OfygTwAQ6G6Nfsxkm6

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: game_modes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_modes (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.game_modes OWNER TO postgres;

--
-- Name: TABLE game_modes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.game_modes IS 'Режимы игр (например, "Демо", "Реальные деньги")';


--
-- Name: COLUMN game_modes.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_modes.id IS 'ИД (PK)';


--
-- Name: COLUMN game_modes.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_modes.name IS 'Название режима';


--
-- Name: game_modes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_modes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_modes_id_seq OWNER TO postgres;

--
-- Name: game_modes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_modes_id_seq OWNED BY public.game_modes.id;


--
-- Name: game_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_settings (
    id integer NOT NULL,
    game_type_id integer NOT NULL,
    setting_key character varying(100) NOT NULL,
    setting_value character varying(255) NOT NULL
);


ALTER TABLE public.game_settings OWNER TO postgres;

--
-- Name: TABLE game_settings; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.game_settings IS 'Настройки для каждого вида игры (замена таблицы "Комбинации")';


--
-- Name: COLUMN game_settings.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_settings.id IS 'ИД (PK)';


--
-- Name: COLUMN game_settings.game_type_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_settings.game_type_id IS 'Ссылка на вид игры (FK)';


--
-- Name: COLUMN game_settings.setting_key; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_settings.setting_key IS 'Ключ настройки (из старой схемы: "Множитель" или "Значение")';


--
-- Name: COLUMN game_settings.setting_value; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_settings.setting_value IS 'Значение настройки';


--
-- Name: game_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_settings_id_seq OWNER TO postgres;

--
-- Name: game_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_settings_id_seq OWNED BY public.game_settings.id;


--
-- Name: game_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.game_types OWNER TO postgres;

--
-- Name: TABLE game_types; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.game_types IS 'Виды игр (например, "Слоты", "Рулетка")';


--
-- Name: COLUMN game_types.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_types.id IS 'ИД (PK)';


--
-- Name: COLUMN game_types.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.game_types.name IS 'Название вида игры';


--
-- Name: game_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_types_id_seq OWNER TO postgres;

--
-- Name: game_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_types_id_seq OWNED BY public.game_types.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    id integer NOT NULL,
    game_type_id integer NOT NULL,
    game_mode_id integer NOT NULL
);


ALTER TABLE public.games OWNER TO postgres;

--
-- Name: TABLE games; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.games IS 'Конкретный экземпляр запущенной игры';


--
-- Name: COLUMN games.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.games.id IS 'ИД (PK)';


--
-- Name: COLUMN games.game_type_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.games.game_type_id IS 'Ссылка на вид игры (FK)';


--
-- Name: COLUMN games.game_mode_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.games.game_mode_id IS 'Ссылка на режим игры (FK)';


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.games_id_seq OWNER TO postgres;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: transaction_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_log (
    id integer NOT NULL,
    game_id integer,
    user_id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    win_amount numeric(12,2) DEFAULT 0.00 NOT NULL,
    bet_amount numeric(12,2) DEFAULT 0.00 NOT NULL
);


ALTER TABLE public.transaction_log OWNER TO postgres;

--
-- Name: TABLE transaction_log; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.transaction_log IS 'Журнал транзакций (ставки и выигрыши)';


--
-- Name: COLUMN transaction_log.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log.id IS 'ИД (PK)';


--
-- Name: COLUMN transaction_log.game_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log.game_id IS 'Ссылка на игру (FK)';


--
-- Name: COLUMN transaction_log.user_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log.user_id IS 'Ссылка на пользователя (FK)';


--
-- Name: COLUMN transaction_log."timestamp"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log."timestamp" IS 'дата-время';


--
-- Name: COLUMN transaction_log.win_amount; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log.win_amount IS 'выигрыш';


--
-- Name: COLUMN transaction_log.bet_amount; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transaction_log.bet_amount IS 'ставка';


--
-- Name: transaction_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_log_id_seq OWNER TO postgres;

--
-- Name: transaction_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_log_id_seq OWNED BY public.transaction_log.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying NOT NULL,
    avatar character varying(255),
    registration_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'Пользователи системы';


--
-- Name: COLUMN users.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.id IS 'ИД (PK)';


--
-- Name: COLUMN users.login; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.login IS 'логин';


--
-- Name: COLUMN users.password_hash; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.password_hash IS 'хэш пароля';


--
-- Name: COLUMN users.role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.role IS 'роль (admin, user, etc.)';


--
-- Name: COLUMN users.avatar; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.avatar IS 'аватарка (URL или путь)';


--
-- Name: COLUMN users.registration_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.registration_date IS 'дата регистрации';


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: game_modes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_modes ALTER COLUMN id SET DEFAULT nextval('public.game_modes_id_seq'::regclass);


--
-- Name: game_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings ALTER COLUMN id SET DEFAULT nextval('public.game_settings_id_seq'::regclass);


--
-- Name: game_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_types ALTER COLUMN id SET DEFAULT nextval('public.game_types_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: transaction_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log ALTER COLUMN id SET DEFAULT nextval('public.transaction_log_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: game_modes game_modes_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_modes
    ADD CONSTRAINT game_modes_name_key UNIQUE (name);


--
-- Name: game_modes game_modes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_modes
    ADD CONSTRAINT game_modes_pkey PRIMARY KEY (id);


--
-- Name: game_settings game_settings_game_type_id_setting_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT game_settings_game_type_id_setting_key_key UNIQUE (game_type_id, setting_key);


--
-- Name: game_settings game_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT game_settings_pkey PRIMARY KEY (id);


--
-- Name: game_types game_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_types
    ADD CONSTRAINT game_types_name_key UNIQUE (name);


--
-- Name: game_types game_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_types
    ADD CONSTRAINT game_types_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: transaction_log transaction_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT transaction_log_pkey PRIMARY KEY (id);


--
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_game_settings_game_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_settings_game_type_id ON public.game_settings USING btree (game_type_id);


--
-- Name: idx_games_game_mode_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_games_game_mode_id ON public.games USING btree (game_mode_id);


--
-- Name: idx_games_game_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_games_game_type_id ON public.games USING btree (game_type_id);


--
-- Name: idx_transaction_log_game_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_transaction_log_game_id ON public.transaction_log USING btree (game_id);


--
-- Name: idx_transaction_log_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_transaction_log_user_id ON public.transaction_log USING btree (user_id);


--
-- Name: transaction_log fk_game; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE SET NULL;


--
-- Name: games fk_game_mode; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT fk_game_mode FOREIGN KEY (game_mode_id) REFERENCES public.game_modes(id) ON DELETE RESTRICT;


--
-- Name: game_settings fk_game_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT fk_game_type FOREIGN KEY (game_type_id) REFERENCES public.game_types(id) ON DELETE CASCADE;


--
-- Name: games fk_game_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT fk_game_type FOREIGN KEY (game_type_id) REFERENCES public.game_types(id) ON DELETE RESTRICT;


--
-- Name: transaction_log fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_log
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict EPx2bRrFyplBvxeLZfdQz4yIKu4ivCg1Xea9TEwePgU19OfygTwAQ6G6Nfsxkm6

