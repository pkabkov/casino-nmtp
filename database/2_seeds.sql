--
-- PostgreSQL database dump
--

\restrict ZF26ePfCXZKngiV8OseNySIyUeZuBNNeweKfE4lc1Fd7FpC8uoXaeS1udg0eg4N

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

--
-- Data for Name: game_modes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game_modes (id, name) FROM stdin;
1	Демо
2	Реальные деньги
\.


--
-- Data for Name: game_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game_types (id, name) FROM stdin;
1	Классические Слоты
2	Европейская Рулетка
3	Блэкджек
\.


--
-- Data for Name: game_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game_settings (id, game_type_id, setting_key, setting_value) FROM stdin;
1	1	Мин. ставка	10
2	1	Макс. ставка	500
3	1	Множитель "777"	x100
4	2	Макс. ставка на число	1000
5	2	Тип	Европейская (1 зеро)
6	3	Количество колод	6
7	3	Блэкджек платит	3:2
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.games (id, game_type_id, game_mode_id) FROM stdin;
1	1	2
2	1	2
3	2	1
4	1	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, password_hash, role, avatar, registration_date) FROM stdin;
1	player_one	hashed_password_123	user	/avatars/p1.png	2025-11-09 15:47:11.124051+03
2	admin_jane	hashed_password_abc	admin	\N	2025-11-09 15:47:11.124051+03
3	lucky_gamer	hashed_password_777	user	/avatars/lucky.png	2025-11-09 15:47:11.124051+03
\.


--
-- Data for Name: transaction_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_log (id, game_id, user_id, "timestamp", win_amount, bet_amount) FROM stdin;
1	\N	1	2025-11-08 15:47:11.124051+03	1000.00	0.00
2	1	1	2025-11-09 14:47:11.124051+03	50.00	10.00
3	2	1	2025-11-09 15:17:11.124051+03	0.00	10.00
4	3	2	2025-11-09 15:32:11.124051+03	0.00	100.00
5	4	1	2025-11-09 15:42:11.124051+03	1000.00	10.00
\.


--
-- Name: game_modes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_modes_id_seq', 2, true);


--
-- Name: game_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_settings_id_seq', 7, true);


--
-- Name: game_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_types_id_seq', 3, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.games_id_seq', 4, true);


--
-- Name: transaction_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_log_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

\unrestrict ZF26ePfCXZKngiV8OseNySIyUeZuBNNeweKfE4lc1Fd7FpC8uoXaeS1udg0eg4N

