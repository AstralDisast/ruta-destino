<script lang="ts">
	// Importación de módulos y bibliotecas necesarios
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	// Declaración de variables con opciones de configuración
	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	// Creación de despachador de eventos para comunicarse con componentes padres
	const dispatch = createEventDispatcher();

	// Declaración de variables de estado
	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	// Función ejecutada después de que el componente es montado en el DOM
	onMount(() => {
		// Comprobación de la existencia de límites o vista/zoom
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		// Creación de un objeto de mapa Leaflet y configuración de eventos
		map = L.map(mapElement)
			.on('zoom', (e) => dispatch('zoom', e)) // Ejemplo de despacho de evento 'zoom'
			.on('popupopen', async (e) => {
				await tick();
				e.popup.update();
			});

		// Adición de una capa de teselas (tiles) al mapa
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);
	});

	// Función ejecutada antes de que el componente sea destruido
	onDestroy(() => {
		map?.remove(); // Eliminación del mapa al destruir el componente
		map = undefined;
	});

	// Establecimiento de un contexto para exponer el objeto de mapa
	setContext('map', {
		getMap: () => map
	});

	// Efecto reactivo que ajusta la vista del mapa cuando cambian las propiedades
	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}
</script>

<!-- Elemento div que contendrá el mapa y se enlaza con la variable mapElement -->
<div class="w-full h-full" bind:this={mapElement}>
    <!-- Renderización del contenido del slot si el mapa está definido -->
    {#if map}
        <slot/>
    {/if}
</div>
