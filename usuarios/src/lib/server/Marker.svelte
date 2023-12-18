<script lang="ts">
	// Importación de módulos y bibliotecas necesarios
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import L from 'leaflet';

	// Declaración de propiedades
	export let width: number;
	export let height: number;
	export let latLng: L.LatLngExpression;

	// Declaración de variables de estado
	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	// Obtención del objeto de mapa del contexto
	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	// Establecimiento de un contexto para exponer el objeto de capa (layer)
	setContext('layer', {
		// L.Marker hereda de L.Layer
		getLayer: () => marker
	});

	// Función ejecutada después de que el componente es montado en el DOM
	onMount(() => {
		if (map) {
			// Creación de un ícono personalizado para el marcador
			let icon = L.divIcon({
				html: markerElement,
				className: 'map-marker',
				iconSize: L.point(width, height)
			});
			
			// Creación de un marcador y adición al mapa
			marker = L.marker(latLng, { icon }).addTo(map);
		}
	});

	// Función ejecutada antes de que el componente sea destruido
	onDestroy(() => {
		marker?.remove(); // Eliminación del marcador al destruir el componente
		marker = undefined;
	});
</script>

<!-- Elemento div que contendrá el marcador y se enlaza con la variable markerElement -->
<div bind:this={markerElement}>
	<!-- Renderización del contenido del slot si el marcador está definido -->
	{#if marker}
		<slot />
	{/if}
</div>
